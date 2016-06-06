# SVG Font 2 glyph map

Takes an SVG font file and outputs a glyph map json file


The input file must be an __SVG font__ file. This package is used from the __Command line only__.

The output glyph map is a json object where the keys are the glyph names (glyph-name) and the values are character codes of the gliphs unicode (unicode) values.

##CLI interface

```
Usage: svgfont2glyphmap <fontFile> <outputFile>
```

example:

```
$ svgfont2glyphmap ./myIcons.svg ./myIcons-map.json
```


### Example input

myIcons.svg

```SVG
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" >
<svg xmlns="http://www.w3.org/2000/svg">
<defs>
  <font id="myIcons" horiz-adv-x="32">
    <font-face font-family="myIcons"
      units-per-em="32" ascent="32"
      descent="0" />
    <missing-glyph horiz-adv-x="0" />
    <glyph glyph-name="triangle-down"
      unicode="&#xEA23;"
      horiz-adv-x="32" d=" M0 24L32 24L16 8L0 24z" />
    <glyph glyph-name="triangle-up"
      unicode="&#xEA24;"
      horiz-adv-x="32" d=" M16 16L32 0L0 0z" />
  </font>
</defs>
</svg>
```

### Example output

myIcons-map.json

```JSON
{
  "triangle-up": 59940,
  "triangle-down": 59939
}
```
