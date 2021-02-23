'use strict';

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
var app = {
  title: 'Indecision App',
  subtitle: 'Put your life in hands of a computer',
  options: ['Item 1', 'Item 2', 'Item 3']
};

var template = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    app.title
  ),
  app.subtitle && React.createElement(
    'h3',
    null,
    app.subtitle
  ),
  app.options.length > 0 ? React.createElement(
    'p',
    null,
    'Here are your options'
  ) : React.createElement(
    'p',
    null,
    'No Options'
  ),
  React.createElement(
    'ol',
    null,
    React.createElement(
      'li',
      null,
      'Item One'
    ),
    React.createElement(
      'li',
      null,
      'Item Two'
    )
  ),
  React.createElement(
    'form',
    null,
    React.createElement('input', { type: 'text', name: 'option' }),
    React.createElement(
      'button',
      null,
      'Add Option'
    )
  )
);
var appRoot = document.querySelector('#app');
ReactDOM.render(template, appRoot);
// render() takes two Arguments -
//  1.JSX to render.
//  2. DOM element where you want to render it.
