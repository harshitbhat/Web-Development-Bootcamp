/* -------------------------------------------------------------------------- */
/*                 Some Commands to use JSX - installing balel                */
/* -------------------------------------------------------------------------- */
/*                      yarn global add babel-cli@6.24.1                      */
/*                                  yarn init                                 */
/*          yarn add babel-preset-react@6.24.1 babel-preset-env@1.5.2         */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */

console.log('app.js is running!!!');
/* -------------------------------------------------------------------------- */
/*                            JSX - Javascript XML                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             To compile JSX use:                            */
/* -------------------------------------------------------------------------- */
/*    babel src/app.js --out-file=public/scripts/app.js --presets=env,react   */
/* -------------------------------------------------------------------------- */
/*                      src/app.js -> File to be compiled                     */
/*      --out-file=public/scripts/app.js -> where to compile, the results     */
/*                     --presets=env,react -> presets used                    */
/*              Add --watch at end to make changes simultaneously             */
/* -------------------------------------------------------------------------- */
const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in hands of a computer',
  options: ['Item 1', 'Item 2', 'Item 3'],
};

const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <h3>{app.subtitle}</h3>}
    {app.options.length > 0 ? <p>Here are your options</p> : <p>No Options</p>}
    <ol>
      <li>Item One</li>
      <li>Item Two</li>
    </ol>
    <form>
      <input type="text" name="option" />
      <button>Add Option</button>
    </form>
  </div>
);
const appRoot = document.querySelector('#app');
ReactDOM.render(template, appRoot);
// render() takes two Arguments -
//  1.JSX to render.
//  2. DOM element where you want to render it.
