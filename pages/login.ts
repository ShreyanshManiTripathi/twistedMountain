import { PageObjectManager } from '../pages/poManager';
import {selectors} from '..//testData/locator.json';

export class loginPage {
 
    
  private pom: PageObjectManager;

  constructor(pom: PageObjectManager) {
    this.pom = pom;
  }

  async navigateToLogin(URL: string ) {
    const makeAppointmentLocator='a#btn-make-appointment';
    await this.pom.init()
    const page = this.pom.getPage();
    await page.goto(URL);
    await page.click(makeAppointmentLocator);
  }

  async enterCredentials(username: string, password: string) {
 
    const page = this.pom.getPage();
    await page.fill(selectors.login.username, username);
    await page.fill(selectors.login.password, password);
  }

  async submitLogin() {
    const loginbuttonLocator: string = 'button#btn-login';
    const page = this.pom.getPage();
    await page.click(selectors.login.submit);
  }
}

