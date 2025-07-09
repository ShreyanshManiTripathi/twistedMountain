import { test, expect, chromium } from '@playwright/test'
import { PageObjectManager } from "../pages/poManager";
import { loginPage } from "../pages/login";
import data from "../testData/testdata.json";
import { makeAppointmentPage } from '../pages/makeAppointment';
let username = 'John Doe'
let password = 'ThisIsNotAPassword'
let testComment = 'This is a test comment'
let appointmentDate = '12/10/2025'
let URL = 'https://katalon-demo-cura.herokuapp.com/'




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



    // await page.selectOption('#combo_facility', 'Tokyo CURA Healthcare Center');

    // await page.locator('input#chk_hospotal_readmission').check();
    // const facility = await page.locator('#combo_facility').inputValue();

    // const checkbox = page.locator('#chk_hospotal_readmission');
    // const isChecked = await checkbox.isChecked();
    // const reAdmission = isChecked ? 'Yes' : 'No';

    // await page.locator('input#radio_program_medicaid').click();
    // const healthCareProgram = await page.locator('input#radio_program_medicaid');

    // const healthCareProgramValue = await healthCareProgram.inputValue();


    // await page.locator('textarea#txt_comment').fill(testComment)

    // await page.locator('input#txt_visit_date').pressSequentially(appointmentDate)

    // await page.locator('button#btn-book-appointment').click()
    // await expect(page.locator('p#facility')).toHaveText('Tokyo CURA Healthcare Center')
    // await expect(page.locator('p#visit_date')).toHaveText(appointmentDate)
    // await expect(page.locator('p#program')).toHaveText(healthCareProgramValue)
    // await expect(page.locator('p#hospital_readmission')).toHaveText(reAdmission)
    // await expect(page.locator('p#comment')).toHaveText(testComment)
})

test('Apointment Booking', async () => {
   const pom = new PageObjectManager();
    await pom.init();
    const login = new loginPage(pom);
    await login.navigateToLogin(URL);
    await login.enterCredentials(username, password);
    await login.submitLogin();
    const makeAppointment = new makeAppointmentPage(pom);
    await makeAppointment.fillAppointmentDetails('Tokyo CURA Healthcare Center', testComment, appointmentDate); 
    await pom.getPage().waitForTimeout(2000); // Wait for 2 seconds to ensure the form is filled
    await makeAppointment.submitAppointment();
    const page = pom.getPage();
    await expect(page.locator('h2')).toHaveText('Appointment Confirmation');
    await pom.close();
})