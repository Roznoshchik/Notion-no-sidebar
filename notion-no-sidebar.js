// ==UserScript==
// @name         notion-change-sidebar-behaviour
// @namespace    https://github.com/Roznoshchik/Notion-no-sidebar/
// @version      0.1
// @description  Notions auto appearing sidebar is very annoying when working side by side with other windows. This code inserts a button to the dom and uses it to change the sidebar behaviour.
// @author       Roznoshchik
// @match        https://www.notion.so/*
// @grant        none
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @run-at document-idle
// ==/UserScript==

(function() {
    'use strict';

    //set global variables
    var btn;
    var NScontainer;
    var Nframe;
    var Nsidebar;
    var Ntopbar;

    //Because Notion creates the page from JS, need to use this function to wait for everything to load.
    function a(){
        waitForKeyElements (".notion-sidebar-container", b);
    };
    function b(){
        waitForKeyElements (".notion-frame", c);
    };
     function c(){
        waitForKeyElements (".notion-topbar", setVariables);
    };
    waitForKeyElements (".notion-sidebar", a);


    //Once everything is loaded, query everything and set initial values.
    function setVariables(){
        NScontainer = document.querySelector(".notion-sidebar-container");
        NScontainer.style.visibility = "visible";

        Nframe = document.querySelector(".notion-frame");
        Nframe.style.position = "relative";

        Nsidebar = document.querySelector(".notion-sidebar");
        Nsidebar.style.visibility = "visible";

        Ntopbar = document.querySelector(".notion-topbar").firstChild;

        //call the main function.
        isLoaded();
    };

    //function that changes the sidebar position and visibility on button click.
    function vizsidebar()
    {

        if (NScontainer.style.visibility === "visible")
        {
            NScontainer.style.visibility = "hidden";
        }
        else
        {
            NScontainer.style.visibility = "visible";
        }

        if (Nsidebar.style.visibility === "visible")
        {
            Nsidebar.style.visibility = "hidden";
        }
        else
        {
            Nsidebar.style.visibility = "visible";
        }

        if (Nframe.style.position === "relative")
        {
            Nframe.style.position = "absolute";
            Nframe.style.width = "100vw";
        }
        else
        {
            Nframe.style.position = "relative";
        }
    };
    
    //main function that creates the button and inserts it into the dom
    function isLoaded(){

        btn = document.createElement("button");
        btn.innerHTML = '<svg viewBox="0 0 14 14" style="width: 14px; height: 14px; display: block; fill: rgba(55, 53, 47, 0.8); flex-shrink: 0; backface-visibility: hidden;" class="doubleChevronLeft"><path d="M7 12.025L8.225 13.25L14 7.125L8.225 1L7 2.225L11.55 7.125L7 12.025ZM0 12.025L1.225 13.25L7 7.125L1.225 1L8.56743e-07 2.225L4.55 7.125L0 12.025Z"></path></svg>';

        btn.style.cssText = "background-color: #f4511e; border: none; color: white; padding: 8px 8px; text-align: center; font-size: 16px; margin: 4px 2px; opacity: 0.6; transition: 0.3s; display: inline-block; text-decoration: none; cursor: pointer;"

        Ntopbar.insertBefore(btn, Ntopbar.firstChild);

        // sets the onclick function for the button. 
        btn.onclick = function(){
            vizsidebar();
        };
    };
})();
