import { AngularBlogPage } from './app.po';

describe('angular-blog App', () => {
  let page: AngularBlogPage;

  beforeEach(() => {
    page = new AngularBlogPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
