# Contributing

Do you like this library and want to get involved? We would love for you to contribute and help make it even better. As a contributor, here are the guidelines we would like you to follow.

## Code of Conduct

This library is open and inclusive. Please read and follow our [Code of Conduct][coc].

## Questions

First make sure your question is entirely related to this library and not to Angular or Typescript. You can find answers for those in StackOverflow and GitHub.

Search the issues, even the closed ones using keywords for your problem. There is a possibility that someone had the same problem before and there is already a fix available. Also try StackOverflow, you will find thousands of developers willing to help there and the solutions might help other people with the same problem as you. 

[coc]: https://github.com/devconcept/ng-shopping-cart/blob/master/CODE_OF_CONDUCT.md

## Bugs and features

If you found a bug you are welcome to report it submitting an issue. You can also open a pull request if you are confident you can fix it but make sure to open the issue first and discuss the problem. The same applies for new features big or small. The scope of this library is to help a broad audience that uses Angular in their e-commerce applications and not a particular use case. This also help coordinate our efforts and prevent duplication of work.

Try not to pollute your changes trying to address several issues at once. Keep them simple and focused on one single problem. You can open a new PR or issue to solve the others.

Provide a Plunker or demo via GitHub repo with the problem you found. We need to confirm it actually exist before proceeding to fix it. Saving us time will serve to fix more bugs and help more people.

## Pull request

Make sure you follow all of the steps mentioned here as they ensure your changes are accepted and merged quickly:

Click the Fork button to create your personal fork of this repository

Clone your copy using git

Run `npm install` to download and install dependencies.

Create a new branch for your changes

```shell
git checkout -b my-fix-branch master
```

Fix the bug or add the feature you want

Add the required tests to make sure your code works and run the test suite ensuring all tests pass. The `src/testing` folder can be used to create support classes and services for testing.
   
```shell
ng test
```

Run the linting tasks. There are two of them in the `package.json` file. One is for typescript related files `npm run lint:ts`, eg: the library components; and the other is for javascript related files `npm run lint:js`, eg: documentation generation files. Running `npm run lint` will execute them both.

If possible make sure code coverage didn't diminished. There are tasks available for that too. Execute `npm run coverage` and serve the `coverage` folder with your preferred web server for static assets.

Run the library packing tasks `npm run pack` to see if it compiles. It will create a `dist` folder. You can safely delete it after you are done. This ensures that your code runs and also compiles into [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview).

Compile the demo for production using `npm run build`. This ensure your code still works for people using AOT when serving their application.

Commit your changes using a descriptive commit message that give us an idea of what you did

Push your branch to GitHub

```shell
git push origin my-fix-branch
```

Open GitHub and send a pull request to the `master` branch.

Check the results from the Travis CI tests

Keep adding commits with more changes if needed.

After the pull request is merged, you can delete your branch and update your local copy from the upstream repository.

## Gulp

We use gulp but those tasks automate documentation generation and packing of the library. You probably will not need those for contributions. 

