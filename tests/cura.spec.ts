import { test, expect, chromium } from '@playwright/test'
import { PageObjectManager } from "../pages/poManager";
import { loginPage } from "../pages/login";
import data from "../testData/testdata.json";
import { makeAppointmentPage } from '../pages/makeAppointment';
import { selectors } from '../testData/locator.json';
test.describe('Login scenarios', () => {

    test('Valid login', async () => {

        const login = new loginPage(new PageObjectManager());
        await login.navigateToLogin(data.testData.data[0].fixAppointmentData.URL);
        await login.enterCredentials(data.testData.data[0].fixAppointmentData.username, data.testData.data[0].fixAppointmentData.password);
        await login.submitLogin();
    })
    test('Invalid username and valid password', async () => {
        const pom = new PageObjectManager();
        await pom.init();
        const page = pom.getPage();
        const login = new loginPage(new PageObjectManager());
        await login.navigateToLogin(data.testData.data[0].fixAppointmentData.URL);
        await login.enterCredentials(data.Incorrrectlogindata.selectors.login.username, data.Incorrrectlogindata.selectors.login.password);
        await login.submitLogin();
        await page.pause()
        await page.waitForSelector(selectors.login.errorMessage, { timeout: 8000 });
        const errorMessage = await page.locator(selectors.login.errorMessage).textContent();
        expect(errorMessage).toContain(data.testData.data[0].fixAppointmentData.errorMessage)
    });

})
test('Apointment Booking', async () => {
    const pom = new PageObjectManager();
    await pom.init();
    const login = new loginPage(pom);
    await login.navigateToLogin(data.testData.data[0].fixAppointmentData.URL);
    await login.enterCredentials(data.testData.data[0].fixAppointmentData.username, data.testData.data[0].fixAppointmentData.password);
    await login.submitLogin();
    const makeAppointment = new makeAppointmentPage(pom);
    await makeAppointment.fillAppointmentDetails(
        data.testData.data[0].fixAppointmentData.facility,
        data.testData.data[0].fixAppointmentData.testComment,
        data.testData.data[0].fixAppointmentData.appointmentDate
    );
    await pom.getPage().waitForTimeout(2000);
    await makeAppointment.submitAppointment();
    const page = pom.getPage();
    await expect(page.locator(selectors.confirmation.header)).toHaveText(data.testData.data[0].fixAppointmentData.appointmentConfirmationMessage)
    await expect(page.locator(selectors.confirmation.facility)).toHaveText(data.testData.data[0].fixAppointmentData.facility)
    await expect(page.locator(selectors.confirmation.visit_date)).toHaveText(data.testData.data[0].fixAppointmentData.appointmentDate)
    await expect(page.locator(selectors.confirmation.program)).toHaveText(await makeAppointment.getHealthCareProgramStatus() ?? '')
    await expect(page.locator(selectors.confirmation.hospital_readmission)).toHaveText(await makeAppointment.getReAdmissionStatus() ?? '')
    await expect(page.locator(selectors.confirmation.comment)).toHaveText(data.testData.data[0].fixAppointmentData.testComment)
    await pom.close();
})