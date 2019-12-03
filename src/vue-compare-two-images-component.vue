<!--
    Compare image component
-->

<template>
    <div
        class="compare-image-wrapper"
        ref="wrapper"
        @mousedown="mouseDownEventHandler($event)"
        @mouseup="mouseUpEventHandler($event)"
        @mouseleave="mouseUpEventHandler($event)"
        @mousemove="mouseMoveEventHandler($event)"
        @touchmove="touchMoveEventHandler($event)"
    >
        <div class="images-wrapper">
            <div class="left-image" ref="leftImageWrapper" :style="leftImageWrapperStyle">
                <div
                    class="label"
                    :class="labelsPositionClass"
                    :style="leftLabelStyle"
                >{{ leftLabel }}</div>
                <img ref="leftImage" alt="Left side image" draggable="false" :style="leftImgStyle" />
            </div>
            <div class="right-image">
                <div
                    class="label"
                    ref="rightLabel"
                    :class="labelsPositionClass"
                    :style="rightLabelStyle"
                >{{ rightLabel }}</div>
                <img ref="rightImage" alt="Right side image" draggable="false" />
            </div>
        </div>
        <div
            class="divider-wrapper"
            ref="divider"
            :style="dividerWrapperStyle"
            @mouseover="changeDividerClassAndWidth($event)"
            @mouseleave="removeHoveredClass($event)"
        >
            <hr ref="dividerHR" :style="hrElementsStyle" />

            <div class="divider" :style="dividerElementsStyle">
                <div class="arrow" v-if="showAnimateArrows" :style="leftArrowStyle">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 492 492"
                        style="enable-background:new 0 0 492 492;"
                        xml:space="preserve"
                        :style="dividerArrowStyle"
                    >
                        <g>
                            <g>
                                <path
                                    d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
			C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
			c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
			l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"
                                />
                            </g>
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                    </svg>
                </div>
                <div class="arrow" v-if="showAnimateArrows" :style="rightArrowStyle">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 492.004 492.004"
                        style="enable-background:new 0 0 492.004 492.004;"
                        xml:space="preserve"
                        :style="dividerArrowStyle"
                    >
                        <g>
                            <g>
                                <path
                                    d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
			c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
			c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
			c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                                />
                            </g>
                        </g>
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                        <g />
                    </svg>
                </div>
            </div>

            <hr :style="hrElementsStyle" />
        </div>
    </div>
</template>

<!--
    Root app component
-->

<script>
export default {
    name: "compareTwoImages",
    mounted() {
        // Add images into <img> and calc wrapper height
        this.addImagesOnWrapper();
        // Calculate divider current position from initial percentage value
        this.setDividerPositionFromRelative();
        window.addEventListener(
            "resize",
            this.changeWrapperHeightOnResizeEvent
        );
    },
    destroyed() {
        window.addEventListener(
            "resize",
            this.changeWrapperHeightOnResizeEvent
        );
    },
    data() {
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
        mouseDownEventHandler(e) {
            // Prevent press for secondary button
            if (e.button == 2) return false;
            if (e.target.parentElement.classList.contains("divider-wrapper")) {
                this.mouseMoveReady = true;
                if (this.$refs.divider.classList.contains("animated"))
                    this.$refs.divider.classList.remove("animated");
            } else {
                this.$refs.divider.classList.add("animated");
                this.changeDividerPosition(e);
                // Change left image wrapper width
                this.$refs.leftImageWrapper.classList.add("animated");
            }
        },
        mouseUpEventHandler(e) {
            if (this.mouseMoveReady) this.mouseMoveReady = false;
        },
        mouseMoveEventHandler(e) {
            if (this.mouseMoveReady) {
                this.changeDividerPosition(e);
                this.slideLeftImageWrapper();
            }
        },
        touchMoveEventHandler(e) {
            if (e.target.parentElement.classList.contains("divider-wrapper")) {
                if (this.$refs.divider.classList.contains("animated"))
                    this.$refs.divider.classList.remove("animated");

                this.changeDividerPosition(e);
                this.slideLeftImageWrapper();
            }
        },
        changeDividerPosition(event) {
            const rectWrapper = this.$refs.wrapper.getBoundingClientRect();
            const position =
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
                const labelLeftPosition = this.$refs.rightLabel.offsetLeft;
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
        slideLeftImageWrapper() {
            // Change left image wrapper width
            if (this.$refs.leftImageWrapper.classList.contains("animated"))
                this.$refs.leftImageWrapper.classList.remove("animated");
        },
        addImagesOnWrapper() {
            const wrapperWidth = this.$refs.wrapper.getBoundingClientRect()
                .width;
            let imageWH = -1;
            let minImageHeight = 0;
            ["leftImage", "rightImage"].forEach(el => {
                const img = new Image();
                img.src = this.$props[el];
                img.onload = () => {
                    this.$refs[el].src = img.src;
                    if (!this.$props.adaptiveHeight) {
                        // If adaptive height property is off will set wrapper's height equal to the min img height
                        minImageHeight =
                            img.height < minImageHeight || !minImageHeight
                                ? img.height
                                : minImageHeight;
                        this.$refs.wrapper.style.height = `${minImageHeight}px`;
                    } else {
                        const wh = img.width / img.height;

                        imageWH =
                            wrapperWidth / wh < imageWH || imageWH == -1
                                ? wrapperWidth / wh
                                : imageWH; // Ratio between image width and height
                        this.$refs.wrapper.style.height = `${imageWH}px`;
                        // Set width/height ratio for a wrapper
                        this.ratioWH =
                            this.$refs.wrapper.getBoundingClientRect().width /
                            imageWH;
                    }
                };
            });
        },
        changeWrapperHeightOnResizeEvent() {
            // Change wrapper's height using width/height ratio
            const wrapper = this.$refs.wrapper;
            if (this.$props.adaptiveHeight) {
                const height =
                    wrapper.getBoundingClientRect().width / this.ratioWH;
                wrapper.style.height = `${height}px`;
            }
            this.setDividerPositionFromRelative();
            // Delete animate classes
            this.$refs.divider.classList.remove("animated");
            this.$refs.leftImageWrapper.classList.remove("animated");
        },
        setDividerPositionFromRelative() {
            // Set properly divider position
            const dividerOffset =
                this.$refs.dividerHR.getBoundingClientRect().width / 2;
            this.currentdividerPosition =
                (this.$refs.wrapper.getBoundingClientRect().width / 100) *
                    this.dividerRelativePosition -
                dividerOffset;
        },
        changeDividerClassAndWidth(e) {
            if (
                e.target.tagName.toLowerCase() == "svg" ||
                e.target.tagName.toLowerCase() == "path" ||
                e.target.classList.contains("arrow")
            )
                return false;
            const el = this.$refs.divider.querySelector(".divider");
            el.classList.add("hovered");
            el.style.width = this.$props.dividerWidthOnHover;
        },
        removeHoveredClass(e) {
            const el = this.$refs.divider.querySelector(".divider");
            el.style.width = this.$props.dividerWidth;
            el.classList.remove("hovered");
        }
    },
    computed: {
        dividerWrapperStyle() {
            return {
                left: `${this.currentdividerPosition}px`
            };
        },
        hrElementsStyle() {
            return {
                width: this.$props.dividerWidth,
                backgroundColor: this.$props.dividerColor
            };
        },
        dividerElementsStyle() {
            return {
                width: this.$props.dividerWidth,
                backgroundColor: this.$props.dividerColor,
                marginLeft: `calc(-50% + (${this.$props.dividerWidth} / 2))`
            };
        },
        dividerArrowStyle() {
            return {
                fill: this.$props.dividerColor
            };
        },
        leftArrowStyle() {
            return {
                left: `calc(-10px - ${this.$props.arrowsWidth} - ${this.$props.dividerWidth})`,
                animation: "animateLeftArrow 1.5s infinite",
                width: this.$props.arrowsWidth
            };
        },
        rightArrowStyle() {
            return {
                right: `calc(-10px - ${this.$props.arrowsWidth} - ${this.$props.dividerWidth})`,
                animation: "animateRightArrow 1.5s infinite",
                width: this.$props.arrowsWidth
            };
        },
        leftImageWrapperStyle() {
            return {
                clip: `rect(auto, ${this.currentdividerPosition +
                    2}px, auto, auto)`
            };
        },
        leftImgStyle() {
            return {
                opacity: this.$props.leftImageOpacity
            };
        },
        labelsPositionClass() {
            return this.$props.labelsPosition === "bottom" ? "bottom" : "top";
        },
        leftLabelStyle() {
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
        rightLabelStyle(e) {
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
                    clip: `rect(auto, auto, auto, ${this.rightLabelClipSize}px)`,
                    transition: this.animateRightLabel
                        ? `all 0.5s ease 0.16s`
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
</script>

<!--
    Root app styles
-->

<style scoped>
.compare-image-wrapper {
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.compare-image-wrapper .images-wrapper {
    overflow: hidden;
}
.compare-image-wrapper .images-wrapper .left-image,
.compare-image-wrapper .images-wrapper .right-image {
    height: 100%;
    position: absolute;
    overflow: hidden;
}
.compare-image-wrapper .images-wrapper .left-image img,
.compare-image-wrapper .images-wrapper .right-image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.compare-image-wrapper .images-wrapper .right-image {
    width: 100%;
    z-index: 1;
}
.compare-image-wrapper .images-wrapper .right-image .label {
    right: 0;
}
.compare-image-wrapper .images-wrapper .left-image {
    width: 100%;
    z-index: 2;
}
.compare-image-wrapper .images-wrapper .left-image .label {
    z-index: 1;
}
.compare-image-wrapper .images-wrapper .label {
    position: absolute;
}
.compare-image-wrapper .images-wrapper .label.top {
    top: 0;
}
.compare-image-wrapper .images-wrapper .label.bottom {
    bottom: 0;
}
.compare-image-wrapper .divider-wrapper {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
}
.compare-image-wrapper .divider-wrapper hr:hover,
.compare-image-wrapper .divider-wrapper .divider:hover {
    cursor: pointer;
}
.compare-image-wrapper .divider-wrapper hr {
    margin: 0;
    border: none;
    height: 40%;
}
.compare-image-wrapper .divider-wrapper .divider {
    height: 20%;
    position: relative;
    transition: width 0.5s ease-in;
}
.compare-image-wrapper .divider-wrapper .divider .arrow {
    position: absolute;
    top: calc(50% - 15px);
    transition: opacity 1.5s ease-in;
}
.compare-image-wrapper .divider-wrapper .divider.hovered .arrow {
    animation-play-state: paused;
    transition: opacity 0.1s ease-in;
    opacity: 0;
}
.compare-image-wrapper .divider-wrapper.animated,
.compare-image-wrapper .left-image.animated {
    transition: 0.5s ease;
}

@keyframes animateLeftArrow {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-5px);
    }
}
@keyframes animateRightArrow {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(5px);
    }
}
</style>