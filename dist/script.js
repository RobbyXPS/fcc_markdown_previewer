//import dependencies
const { Provider, connect } = ReactRedux;
const { applyMiddleWare, createStore, combineReducers, bindActionCreators } = Redux;

const placeholder =
`# Heading level 1

## Heading level 2

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>
        </html>

3.  Update the title to match the name of your website.

At the command prompt, type \`nano\`.

* First item
* Second item
* Third item
* Fourth item

*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.

1.  Open the file containing the Linux mascot.
2.  Marvel at its beauty.

    ![React Logo w/ Text](https://www.shareicon.net/data/256x256/2016/07/08/117367_logo_512x512.png)

3.  Close the file.

I just love **bold text**.`;

// set marked lib so that it allows breaks
marked.setOptions({
  breaks: true });


//action
const UPDATE_TEXT = 'update_text';

//defaultState
const defaultState = { text: placeholder };

//action creators
let updateText = event => {
  return {
    type: UPDATE_TEXT,
    payload_text: event.target.value };

};

//reducer
const editorReducer = function (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_TEXT:
      return Object.assign({}, state, {
        text: action.payload_text });

    default:
      return state;}

};

// create store
const store = Redux.createStore(editorReducer);

// mapping for Redux
const mapStateToProps = state => {
  return {
    fetch_text_values: state.text };

};

const mapDispatchToProps = dispatch => {
  return {
    dispatch_user_message: event => dispatch(updateText(event)) };

};

// display options component
class ButtonArea extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "panel panel-primary" },
      React.createElement("div", { className: "panel-heading" }, "Options:"),
      React.createElement("div", { className: "btn-group btn-group-justified" },
      React.createElement("div", { className: "btn-group" },
      React.createElement("button", { className: "btn btn-primary", id: "bothButton" }, "Both")),

      React.createElement("div", { className: "btn-group" },
      React.createElement("button", { className: "btn btn-primary", id: "editorButton" }, "Editor Only")),

      React.createElement("div", { className: "btn-group" },
      React.createElement("button", { className: "btn btn-primary", id: "previewButton" }, "Preview Only")))));




  }}


//editor content component
class EditField extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "editor-container", className: "panel panel-primary" },
      React.createElement("div", { className: "panel-heading" }, "Editor:"),
      React.createElement("textarea", { id: "editor", onChange: this.props.dispatch_user_message }, this.props.fetch_text_values)));


  }}


//preview content component
class PreviewArea extends React.Component {
  //use marked lib to convert markup to html
  converter() {
    var convText = marked(this.props.fetch_text_values, {
      sanitize: true });

    //you have to use this specific key/prop pair. see https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html
    return {
      __html: convText };

  }
  render() {
    return (
      React.createElement("div", { id: "preview-container", className: "panel panel-primary" },
      React.createElement("div", { className: "panel-heading" }, "Preview:"),
      React.createElement("div", { className: "panel-body", id: "preview", dangerouslySetInnerHTML: this.converter() })));


  }}


//connect React to Redux
const EditFieldContainer = connect(mapStateToProps, mapDispatchToProps)(EditField);
const PreviewAreaContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
const ButtonAreaContainer = connect(null, null)(ButtonArea);

//app wrapper component
class App extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "container-fluid row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(ButtonAreaContainer, null),
      React.createElement(EditFieldContainer, null),
      React.createElement(PreviewAreaContainer, null))));



  }}


//render to dom
ReactDOM.render(
React.createElement(Provider, { store: store },
React.createElement(App, null)),

document.getElementById('root'));


// jQuery actions
$(document).ready(function () {
  //button adjustment
  $("#bothButton").click(function () {
    $("#preview-container").show();
    $("#editor-container").show();
  });

  $("#editorButton").click(function () {
    $("#editor-container").show();
    $("#preview-container").hide();
  });

  $("#previewButton").click(function () {
    $("#editor-container").hide();
    $("#preview-container").show();
  });
});