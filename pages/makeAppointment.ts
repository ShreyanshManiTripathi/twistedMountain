import { PageObjectManager } from "./poManager";
import { selectors } from "../testData/locator.json";

export class makeAppointmentPage {
    private pom: PageObjectManager;
    private healthCareProgramValue: string | undefined;
    private reAdmission: string | undefined;
    constructor(pom: PageObjectManager) {
        this.pom = pom;
    }

    async fillAppointmentDetails(facility: string, comment: string, date: string) {
        const page = this.pom.getPage();
        await page.selectOption(selectors.appointment.facility, facility);
        await page.locator(selectors.appointment.comment).fill(comment);
        // await page.locator(selectors.appointment.date).pressSequentially(date);
        await page.locator(selectors.appointment.hospital_readmission);
         const checkbox = page.locator(selectors.appointment.hospital_readmission);
        const isChecked = await checkbox.isChecked();
        this.reAdmission = isChecked ? 'Yes' : 'No';
        
        await page.locator(selectors.appointment.healthcareProgram).click();
        const healthCareProgram = await page.locator(selectors.appointment.healthcareProgram);
        
        this.healthCareProgramValue = await healthCareProgram.inputValue();
        await page.locator(selectors.appointment.date).pressSequentially(date);

    }


    async submitAppointment() {
        const page = this.pom.getPage();
        await page.locator(selectors.appointment.submit).click();
    }

    async getReAdmissionStatus() {
        return this.reAdmission;
    }
    async getHealthCareProgramStatus() {
       return this.healthCareProgramValue;
    }
}

