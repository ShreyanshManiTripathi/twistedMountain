import { PageObjectManager } from '../pages/poManager';


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
    const usernameLocator: string = 'input#txt-username'
    const passwordLocator: string = 'input#txt-password';
    const page = this.pom.getPage();
    await page.fill(usernameLocator, username);
    await page.fill(passwordLocator, password);
  }

  async submitLogin() {
    const loginbuttonLocator: string = 'button#btn-login';
    const page = this.pom.getPage();
    await page.click(loginbuttonLocator);
  }
}

