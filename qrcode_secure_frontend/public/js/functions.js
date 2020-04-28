document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
  //Retrieve app's history
  var history = App.getHistory();

  //Check that there's only one screen in history (the current one):
  if (history.length === 1) {
    //Check that this element is the default (home) screen:
    var history_screen = history[0];
    if (
      TemplateTags.getDefaultRouteLink().replace("#", "") ===
      history_screen.fragment
    ) {
      //Only one element in history and this element is default screen: exit app on back button:
      navigator.app.exitApp();
      return;
    }
  }

  //History has at least one previous element: just go back to it:
  navigator.app.backHistory();
}
