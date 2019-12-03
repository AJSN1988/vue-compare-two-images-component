# Vue two images compare component

Hello. This is simple component for VueJS can help you check diffrence between two images using slider. On this page you will get to know how install and use features this component.

[DEMO & EXAMPLES](https://ajsn1988.github.io/imageCompare/)

[Repository on Github](https://github.com/AJSN1988/vue-compare-two-images-component)

Current version: 1.0.0

License: [MIT](https://github.com/AJSN1988/vue-compare-two-images-component/blob/master/LICENSE)

## Features
- Simple for using
- Responsive (expandes from the container width, set container's height using image properly aspect ratio)
- Flexible tuning
- Mobile frendly

## Install

Install npm package

`$ npm install --save vue-compare-two-images-component`

Register component globally

```javascript
import CompareTwoImages from 'vue-compare-two-images-component';

// Register component as CompareTwoImages after

Vue.use(CompareTwoImages);
```

or import into your component directly.

```javascript
import CompareTwoImages from 'vue-compare-two-images-component';

// Import CompareTwoImages component

export default {
	name: "YourComponentName",
	components: {
		CompareTwoImages: CompareTwoImages
		// Register imported component as CompareTwoImages
	}
}
```

After that use compare-two-images tag into template.

```html
<template>
	<compare-two-images
		:leftImage="path/to/left.png"
		:rightImage="path/to/right.png">
	</compare-two-images>
</template>
```

## Props

| PROPERTY NAME | TYPE | DEFAULT VALUE | DESCRIPTION  |
| :------------: | :------------: | :------------: | :------------: |
| leftImage  | String | null | Left image's url. This property is required |
| labelsEnable   |  Boolean  |  true  | Enabling text labels for images in container|
|  rightImage  | String   |  null  | Right image's url. This property is required  |
| leftLabel   |  String  |  "Left image" | Left image's text label  |
| rightLabel   | String   | "Right image"  |  Right image's text label |
|  leftImageOpacity |  Number  |  1| Left image's opacity (from 1 to 0)  |
| labelsPosition   | String   |  "top" |  Text labels position in container ("top" or "bottom" values only) |
| labelsBackgroundColor   | String   | "rgba(37, 34, 29, 0.58)"  |  A text label's background color (hex/rgba/rgb/none format no matter. Just use CSS correct color format) |
| labelsTextColor   | String   | "rgb(253, 253, 253)"  | A text color in label (hex/rgba/rgb/none format no matter. Just use CSS correct color format)  |
| labelsFontSize   | String   | "inherit"  | Change a text font size in label (e.g. "16px", "1em", "1rem")  |
| labelsUppercase   |  Boolean  |  false  | Setup a text decoration style in label  |
| labelsPaddings   | String   |  "15px" | Text labels's paddings (any CSS correct string value e.g. "10px 10px 10px 10px" or "1em 1.2em")  |
| dividerPosition   |  Number  | 50   | Initial divider horizontal position (in persents)  |
|  dividerWidth  | String   | "2px"  |  Vertical divider's line width (any CSS correct string width value e.g. "0.25em", "4px") |
| dividerWidthOnHover   | String   | "20px"  |  Divider's width on mouse hover (any CSS correct string width value e.g. "2rem", "40px") |
| dividerColor   |  String  | "rgb(253, 253, 253)"  | Divider's color (any CSS correct color format)  |
| showAnimateArrows   | Boolean   | true   |  Visibility animated arrows near divider |
|  arrowsWidth  | String   |  "20px" | Size of animated arrows (any CSS correct string width value e.g. "2rem", "40px")  |
|  arrowsColor  | String   | "rgb(253, 253, 253)"  |  Animated arrows color (any CSS correct string color value - rgb/rgba/hex) |
|  adaptiveHeight  |  Boolean  |  true  |  Enable adaptive container's height |

For additional information see [documentation](https://ajsn1988.github.io/imageCompare/)