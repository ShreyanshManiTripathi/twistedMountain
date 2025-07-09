import { test, expect, chromium } from '@playwright/test'
import { PageObjectManager } from "../pages/poManager";
import { loginPage } from "../pages/login";
import data from "../testData/testdata.json";
import { makeAppointmentPage } from '../pages/makeAppointment';

test('Cura login', async () => {
  const browser = await chromium.launch({
        headless: false,
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    const login = new loginPage(new PageObjectManager());
    await login.navigateToLogin(data.data[0].testData.URL);
    await login.enterCredentials(data.data[0].testData.username, data.data[0].testData.password);
    await login.submitLogin();
})

test('Apointment Booking', async () => {
   const pom = new PageObjectManager();
    await pom.init();
    const login = new loginPage(pom);
    await login.navigateToLogin(data.data[0].testData.URL);
    await login.enterCredentials(data.data[0].testData.username, data.data[0].testData.password);
    await login.submitLogin();
    const makeAppointment = new makeAppointmentPage(pom);
    await makeAppointment.fillAppointmentDetails(data.data[0].testData.facility, data.data[0].testData.testComment, data.data[0].testData.appointmentDate);
    await pom.getPage().waitForTimeout(2000);
    await makeAppointment.submitAppointment();
    const page = pom.getPage();
    await expect(page.locator('h2')).toHaveText(data.data[0].testData.appointmentConfirmationMessage)
 
    await expect(page.locator('p#facility')).toHaveText(data.data[0].testData.facility)
    await expect(page.locator('p#visit_date')).toHaveText(data.data[0].testData.appointmentDate)
    await expect(page.locator('p#program')).toHaveText(await makeAppointment.getHealthCareProgramStatus() ?? '')
    await expect(page.locator('p#hospital_readmission')).toHaveText(await makeAppointment.getReAdmissionStatus() ?? '')
    await expect(page.locator('p#comment')).toHaveText(data.data[0].testData.testComment)
    await pom.close();
})