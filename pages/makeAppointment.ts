import { PageObjectManager } from "./poManager";


export class makeAppointmentPage {
    private pom: PageObjectManager;
    private healthCareProgramValue: string | undefined;
    private reAdmission: string | undefined;
    constructor(pom: PageObjectManager) {
        this.pom = pom;
    }

    async fillAppointmentDetails(facility: string, comment: string, date: string) {
        const page = this.pom.getPage();
        await page.selectOption('#combo_facility', facility);
        await page.locator('textarea#txt_comment').fill(comment);
        await page.locator('#chk_hospotal_readmission');
        
        
        const checkbox = page.locator('#chk_hospotal_readmission');
        const isChecked = await checkbox.isChecked();
        this.reAdmission = isChecked ? 'Yes' : 'No';
        
        await page.locator('input#radio_program_medicaid').click();
        const healthCareProgram = await page.locator('input#radio_program_medicaid');
        
        this.healthCareProgramValue = await healthCareProgram.inputValue();
        await page.locator('input#txt_visit_date').pressSequentially(date);

    }


    async submitAppointment() {
        const page = this.pom.getPage();
        await page.locator('button#btn-book-appointment').click();
    }

    async getReAdmissionStatus() {
        return this.reAdmission;
    }
    async getHealthCareProgramStatus() {
       return this.healthCareProgramValue;
    }
}

