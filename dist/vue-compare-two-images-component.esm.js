//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
    name: "compareTwoImages",
    mounted: function mounted() {
        // Add images into <img> and calc wrapper height
        this.addImagesOnWrapper();
        // Calculate divider current position from initial percentage value
        this.setDividerPositionFromRelative();
        window.addEventListener(
            "resize",
            this.changeWrapperHeightOnResizeEvent
        );
    },
    destroyed: function destroyed() {
        window.addEventListener(
            "resize",
            this.changeWrapperHeightOnResizeEvent
        );
    },
    data: function data() {
        return {
            mouseMoveReady: false,
            currentdividerPosition: 0,
            dividerRelativePosition: this.$props.dividerPosition,
            rationWrapperWH: 0,
            ratioWH: 0,
            rightLabelClipSize: 0,
            animateRightLabel: false
        };
    },
    props: {
        leftImage: {
            type: String,
            default: null
        },
        rightImage: {
            type: String,
            default: null
        },
        leftImageOpacity: {
            type: Number,
            default: 1
        },
        labelsEnable: {
            type: Boolean,
            default: true
        },
        leftLabel: {
            type: String,
            default: "Left image"
        },
        rightLabel: {
            type: String,
            default: "Right image"
        },
        labelsPosition: {
            type: String,
            default: "top"
        },
        labelsBackgroundColor: {
            type: String,
            default: "rgba(37, 34, 29, 0.58)"
        },
        labelsTextColor: {
            type: String,
            default: "rgb(253, 253, 253)"
        },
        labelsFontSize: {
            type: String,
            default: "inherit"
        },
        labelsUppercase: {
            type: Boolean,
            default: false
        },
        labelsPaddings: {
            type: String,
            default: "15px"
        },
        dividerWidth: {
            type: String,
            default: "2px"
        },
        dividerWidthOnHover: {
            type: String,
            default: "20px"
        },
        dividerPosition: {
            type: Number,
            default: 50
        },
        dividerColor: {
            type: String,
            default: "rgb(253, 253, 253)"
        },
        showAnimateArrows: {
            type: Boolean,
            default: true
        },
        arrowsColor: {
            type: String,
            default: "rgb(253, 253, 253)"
        },
        arrowsWidth: {
            type: String,
            default: "20px"
        },
        adaptiveHeight: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        mouseDownEventHandler: function mouseDownEventHandler(e) {
            // Prevent press for secondary button
            if (e.button == 2) { return false; }
            if (e.target.parentElement.classList.contains("divider-wrapper")) {
                this.mouseMoveReady = true;
                if (this.$refs.divider.classList.contains("animated"))
                    { this.$refs.divider.classList.remove("animated"); }
            } else {
                this.$refs.divider.classList.add("animated");
                this.changeDividerPosition(e);
                // Change left image wrapper width
                this.$refs.leftImageWrapper.classList.add("animated");
            }
        },
        mouseUpEventHandler: function mouseUpEventHandler(e) {
            if (this.mouseMoveReady) { this.mouseMoveReady = false; }
        },
        mouseMoveEventHandler: function mouseMoveEventHandler(e) {
            if (this.mouseMoveReady) {
                this.changeDividerPosition(e);
                this.slideLeftImageWrapper();
            }
        },
        touchMoveEventHandler: function touchMoveEventHandler(e) {
            if (e.target.parentElement.classList.contains("divider-wrapper")) {
                if (this.$refs.divider.classList.contains("animated"))
                    { this.$refs.divider.classList.remove("animated"); }

                this.changeDividerPosition(e);
                this.slideLeftImageWrapper();
            }
        },
        changeDividerPosition: function changeDividerPosition(event) {
            var rectWrapper = this.$refs.wrapper.getBoundingClientRect();
            var position =
                event.type == "touchmove"
                    ? event.touches[0].clientX - rectWrapper.left
                    : event.clientX - rectWrapper.left;
            if (position >= -1 && position <= rectWrapper.width) {
                this.currentdividerPosition = position;
                this.dividerRelativePosition =
                    (position / rectWrapper.width) * 100;
            }
            // If we have left image opacity less 1 and divider cross right label rect, will clip this label
            if (this.$props.leftImageOpacity != 1 && this.$props.labelsEnable) {
                var labelLeftPosition = this.$refs.rightLabel.offsetLeft;
                if (this.currentdividerPosition > labelLeftPosition) {
                    this.animateRightLabel = this.$refs.divider.classList.contains(
                        "animated"
                    )
                        ? true
                        : false;
                    this.rightLabelClipSize =
                        this.currentdividerPosition - labelLeftPosition;
                    // this.rightLabelTransitionDelay = this.rightLabelClipSize;
                } else {
                    this.rightLabelClipSize = 0;
                }
            }
        },
        slideLeftImageWrapper: function slideLeftImageWrapper() {
            // Change left image wrapper width
            if (this.$refs.leftImageWrapper.classList.contains("animated"))
                { this.$refs.leftImageWrapper.classList.remove("animated"); }
        },
        addImagesOnWrapper: function addImagesOnWrapper() {
            var this$1 = this;

            var wrapperWidth = this.$refs.wrapper.getBoundingClientRect()
                .width;
            var imageWH = -1;
            var minImageHeight = 0;
            ["leftImage", "rightImage"].forEach(function (el) {
                var img = new Image();
                img.src = this$1.$props[el];
                img.onload = function () {
                    this$1.$refs[el].src = img.src;
                    if (!this$1.$props.adaptiveHeight) {
                        // If adaptive height property is off will set wrapper's height equal to the min img height
                        minImageHeight =
                            img.height < minImageHeight || !minImageHeight
                                ? img.height
                                : minImageHeight;
                        this$1.$refs.wrapper.style.height = minImageHeight + "px";
                    } else {
                        var wh = img.width / img.height;

                        imageWH =
                            wrapperWidth / wh < imageWH || imageWH == -1
                                ? wrapperWidth / wh
                                : imageWH; // Ratio between image width and height
                        this$1.$refs.wrapper.style.height = imageWH + "px";
                        // Set width/height ratio for a wrapper
                        this$1.ratioWH =
                            this$1.$refs.wrapper.getBoundingClientRect().width /
                            imageWH;
                    }
                };
            });
        },
        changeWrapperHeightOnResizeEvent: function changeWrapperHeightOnResizeEvent() {
            // Change wrapper's height using width/height ratio
            var wrapper = this.$refs.wrapper;
            if (this.$props.adaptiveHeight) {
                var height =
                    wrapper.getBoundingClientRect().width / this.ratioWH;
                wrapper.style.height = height + "px";
            }
            this.setDividerPositionFromRelative();
            // Delete animate classes
            this.$refs.divider.classList.remove("animated");
            this.$refs.leftImageWrapper.classList.remove("animated");
        },
        setDividerPositionFromRelative: function setDividerPositionFromRelative() {
            // Set properly divider position
            var dividerOffset =
                this.$refs.dividerHR.getBoundingClientRect().width / 2;
            this.currentdividerPosition =
                (this.$refs.wrapper.getBoundingClientRect().width / 100) *
                    this.dividerRelativePosition -
                dividerOffset;
        },
        changeDividerClassAndWidth: function changeDividerClassAndWidth(e) {
            if (
                e.target.tagName.toLowerCase() == "svg" ||
                e.target.tagName.toLowerCase() == "path" ||
                e.target.classList.contains("arrow")
            )
                { return false; }
            var el = this.$refs.divider.querySelector(".divider");
            el.classList.add("hovered");
            el.style.width = this.$props.dividerWidthOnHover;
        },
        removeHoveredClass: function removeHoveredClass(e) {
            var el = this.$refs.divider.querySelector(".divider");
            el.style.width = this.$props.dividerWidth;
            el.classList.remove("hovered");
        }
    },
    computed: {
        dividerWrapperStyle: function dividerWrapperStyle() {
            return {
                left: ((this.currentdividerPosition) + "px")
            };
        },
        hrElementsStyle: function hrElementsStyle() {
            return {
                width: this.$props.dividerWidth,
                backgroundColor: this.$props.dividerColor
            };
        },
        dividerElementsStyle: function dividerElementsStyle() {
            return {
                width: this.$props.dividerWidth,
                backgroundColor: this.$props.dividerColor,
                marginLeft: ("calc(-50% + (" + (this.$props.dividerWidth) + " / 2))")
            };
        },
        dividerArrowStyle: function dividerArrowStyle() {
            return {
                fill: this.$props.dividerColor
            };
        },
        leftArrowStyle: function leftArrowStyle() {
            return {
                left: ("calc(-10px - " + (this.$props.arrowsWidth) + " - " + (this.$props.dividerWidth) + ")"),
                animation: "animateLeftArrow 1.5s infinite",
                width: this.$props.arrowsWidth
            };
        },
        rightArrowStyle: function rightArrowStyle() {
            return {
                right: ("calc(-10px - " + (this.$props.arrowsWidth) + " - " + (this.$props.dividerWidth) + ")"),
                animation: "animateRightArrow 1.5s infinite",
                width: this.$props.arrowsWidth
            };
        },
        leftImageWrapperStyle: function leftImageWrapperStyle() {
            return {
                clip: ("rect(auto, " + (this.currentdividerPosition +
                    2) + "px, auto, auto)")
            };
        },
        leftImgStyle: function leftImgStyle() {
            return {
                opacity: this.$props.leftImageOpacity
            };
        },
        labelsPositionClass: function labelsPositionClass() {
            return this.$props.labelsPosition === "bottom" ? "bottom" : "top";
        },
        leftLabelStyle: function leftLabelStyle() {
            return {
                display: this.$props.labelsEnable ? "initial" : "none",
                backgroundColor: this.$props.labelsBackgroundColor,
                color: this.$props.labelsTextColor,
                fontSize: this.$props.labelsFontSize,
                textTransform: this.$props.labelsUppercase
                    ? "uppercase"
                    : "none",
                padding: this.$props.labelsPaddings
            };
        },
        rightLabelStyle: function rightLabelStyle(e) {
            if (this.$props.leftImageOpacity && this.$props.labelsEnable) {
                return {
                    display: this.$props.labelsEnable ? "initial" : "none",
                    backgroundColor: this.$props.labelsBackgroundColor,
                    color: this.$props.labelsTextColor,
                    fontSize: this.$props.labelsFontSize,
                    textTransform: this.$props.labelsUppercase
                        ? "uppercase"
                        : "none",
                    padding: this.$props.labelsPaddings,
                    clip: ("rect(auto, auto, auto, " + (this.rightLabelClipSize) + "px)"),
                    transition: this.animateRightLabel
                        ? "all 0.5s ease 0.16s"
                        : "unset"
                };
            }
            return {
                display: this.$props.labelsEnable ? "initial" : "none",
                backgroundColor: this.$props.labelsBackgroundColor,
                color: this.$props.labelsTextColor,
                fontSize: this.$props.labelsFontSize,
                textTransform: this.$props.labelsUppercase
                    ? "uppercase"
                    : "none",
                padding: this.$props.labelsPaddings
            };
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"wrapper",staticClass:"compare-image-wrapper",on:{"mousedown":function($event){return _vm.mouseDownEventHandler($event)},"mouseup":function($event){return _vm.mouseUpEventHandler($event)},"mouseleave":function($event){return _vm.mouseUpEventHandler($event)},"mousemove":function($event){return _vm.mouseMoveEventHandler($event)},"touchmove":function($event){return _vm.touchMoveEventHandler($event)}}},[_c('div',{staticClass:"images-wrapper"},[_c('div',{ref:"leftImageWrapper",staticClass:"left-image",style:(_vm.leftImageWrapperStyle)},[_c('div',{staticClass:"label",class:_vm.labelsPositionClass,style:(_vm.leftLabelStyle)},[_vm._v(_vm._s(_vm.leftLabel))]),_vm._v(" "),_c('img',{ref:"leftImage",style:(_vm.leftImgStyle),attrs:{"alt":"Left side image","draggable":"false"}})]),_vm._v(" "),_c('div',{staticClass:"right-image"},[_c('div',{ref:"rightLabel",staticClass:"label",class:_vm.labelsPositionClass,style:(_vm.rightLabelStyle)},[_vm._v(_vm._s(_vm.rightLabel))]),_vm._v(" "),_c('img',{ref:"rightImage",attrs:{"alt":"Right side image","draggable":"false"}})])]),_vm._v(" "),_c('div',{ref:"divider",staticClass:"divider-wrapper",style:(_vm.dividerWrapperStyle),on:{"mouseover":function($event){return _vm.changeDividerClassAndWidth($event)},"mouseleave":function($event){return _vm.removeHoveredClass($event)}}},[_c('hr',{ref:"dividerHR",style:(_vm.hrElementsStyle)}),_vm._v(" "),_c('div',{staticClass:"divider",style:(_vm.dividerElementsStyle)},[(_vm.showAnimateArrows)?_c('div',{staticClass:"arrow",style:(_vm.leftArrowStyle)},[_c('svg',{staticStyle:{"enable-background":"new 0 0 492 492"},style:(_vm.dividerArrowStyle),attrs:{"version":"1.1","id":"Layer_1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 492 492","xml:space":"preserve"}},[_c('g',[_c('g',[_c('path',{attrs:{"d":"M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12\n\t\t\tC361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084\n\t\t\tc-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864\n\t\t\tl16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"}})])]),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g')])]):_vm._e(),_vm._v(" "),(_vm.showAnimateArrows)?_c('div',{staticClass:"arrow",style:(_vm.rightArrowStyle)},[_c('svg',{staticStyle:{"enable-background":"new 0 0 492.004 492.004"},style:(_vm.dividerArrowStyle),attrs:{"version":"1.1","id":"Layer_1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","x":"0px","y":"0px","viewBox":"0 0 492.004 492.004","xml:space":"preserve"}},[_c('g',[_c('g',[_c('path',{attrs:{"d":"M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12\n\t\t\tc-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028\n\t\t\tc0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265\n\t\t\tc5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"}})])]),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g'),_vm._v(" "),_c('g')])]):_vm._e()]),_vm._v(" "),_c('hr',{style:(_vm.hrElementsStyle)})])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-76c43131_0", { source: ".compare-image-wrapper{position:relative;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%;height:100%;overflow-x:hidden}.compare-image-wrapper .images-wrapper{overflow:hidden}.compare-image-wrapper .images-wrapper .left-image,.compare-image-wrapper .images-wrapper .right-image{height:100%;position:absolute;overflow:hidden}.compare-image-wrapper .images-wrapper .left-image img,.compare-image-wrapper .images-wrapper .right-image img{object-fit:cover;width:100%;height:100%}.compare-image-wrapper .images-wrapper .right-image{width:100%;z-index:1}.compare-image-wrapper .images-wrapper .right-image .label{right:0}.compare-image-wrapper .images-wrapper .left-image{width:100%;z-index:2}.compare-image-wrapper .images-wrapper .left-image .label{z-index:1}.compare-image-wrapper .images-wrapper .label{position:absolute}.compare-image-wrapper .images-wrapper .label.top{top:0}.compare-image-wrapper .images-wrapper .label.bottom{bottom:0}.compare-image-wrapper .divider-wrapper{position:absolute;top:0;display:flex;flex-direction:column;height:100%;z-index:3}.compare-image-wrapper .divider-wrapper .divider:hover,.compare-image-wrapper .divider-wrapper hr:hover{cursor:pointer}.compare-image-wrapper .divider-wrapper hr{margin:0;border:none;height:40%}.compare-image-wrapper .divider-wrapper .divider{height:20%;position:relative;transition:width .5s ease-in}.compare-image-wrapper .divider-wrapper .divider .arrow{position:absolute;top:calc(50% - 15px);transition:opacity 1.5s ease-in}.compare-image-wrapper .divider-wrapper .divider.hovered .arrow{animation-play-state:paused;transition:opacity .1s ease-in;opacity:0}.compare-image-wrapper .divider-wrapper.animated,.compare-image-wrapper .left-image.animated{transition:.5s ease}@-webkit-keyframes animateLeftArrow{0%{transform:translateX(0)}100%{transform:translateX(-5px)}}@-moz-keyframes animateLeftArrow{0%{transform:translateX(0)}100%{transform:translateX(-5px)}}@-o-keyframes animateLeftArrow{0%{transform:translateX(0)}100%{transform:translateX(-5px)}}@keyframes animateLeftArrow{0%{transform:translateX(0)}100%{transform:translateX(-5px)}}@-webkit-keyframes animateRightArrow{0%{transform:translateX(0)}100%{transform:translateX(5px)}}@-moz-keyframes animateRightArrow{0%{transform:translateX(0)}100%{transform:translateX(5px)}}@-o-keyframes animateRightArrow{0%{transform:translateX(0)}100%{transform:translateX(5px)}}@keyframes animateRightArrow{0%{transform:translateX()}100%{transform:translateX(5px)}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var component = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('CompareTwoImages', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default component;
