import { Util, Collection } from '../Util';
import { Factory } from '../Factory';
import { Shape, ShapeConfig } from '../Shape';
import { getNumberValidator } from '../Validators';
import { _registerNode } from '../Global';

import { GetSet, IRect } from '../types';

export interface ImageConfig extends ShapeConfig {
  image: ImageBitmapSource;
  crop?: IRect;
}

/**
 * Image constructor
 * @constructor
 * @memberof Konva
 * @augments Konva.Shape
 * @param {Object} config
 * @param {Image} config.image
 * @param {Object} [config.crop]
 * @@shapeParams
 * @@nodeParams
 * @example
 * var imageObj = new Image();
 * imageObj.onload = function() {
 *   var image = new Konva.Image({
 *     x: 200,
 *     y: 50,
 *     image: imageObj,
 *     width: 100,
 *     height: 100
 *   });
 * };
 * imageObj.src = '/path/to/image.jpg'
 */
export class Image extends Shape<ImageConfig> {
  _useBufferCanvas() {
    return (
      (this.hasShadow() || this.getAbsoluteOpacity() !== 1) &&
      this.hasStroke() &&
      this.getStage()
    );
  }
  _sceneFunc(context) {
    var width = this.width(),
      height = this.height(),
      image = this.image(),
      cropWidth,
      cropHeight,
      params;

    if (image) {
      cropWidth = this.cropWidth();
      cropHeight = this.cropHeight();
      if (cropWidth && cropHeight) {
        params = [
          image,
          this.cropX(),
          this.cropY(),
          cropWidth,
          cropHeight,
          0,
          0,
          width,
          height
        ];
      } else {
        params = [image, 0, 0, width, height];
      }
    }

    if (this.hasFill() || this.hasStroke()) {
      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    }

    if (image) {
      try {
        context.drawImage.apply(context, params); 
      } catch (error) {
      }
    }
  }
  _hitFunc(context) {
    var width = this.width(),
      height = this.height();

    context.beginPath();
    context.rect(0, 0, width, height);
    context.closePath();
    context.fillStrokeShape(this);
  }
  getWidth() {
    var image = this.image();
    return this.attrs.width || (image ? image.width : 0);
  }
  getHeight() {
    var image = this.image();
    return this.attrs.height || (image ? image.height : 0);
  }

  /**
   * load image from given url and create `Konva.Image` instance
   * @method
   * @memberof Konva.Image
   * @param {String} url image source
   * @param {Function} callback with Konva.Image instance as first argument
   * @example
   *  Konva.Image.fromURL(imageURL, function(image){
   *    // image is Konva.Image instance
   *    layer.add(image);
   *    layer.draw();
   *  });
   */
  static fromURL(url, callback) {
    var img = Util.createImageElement();
    img.onload = function() {
      var image = new Image({
        image: img
      });
      callback(image);
    };
    img.crossOrigin = 'Anonymous';
    img.src = url;
  }

  image: GetSet<CanvasImageSource, this>;
  crop: GetSet<IRect, this>;
  cropX: GetSet<number, this>;
  cropY: GetSet<number, this>;
  cropWidth: GetSet<number, this>;
  cropHeight: GetSet<number, this>;
}

Image.prototype.className = 'Image';
_registerNode(Image);
/**
 * get/set image source. It can be image, canvas or video element
 * @name Konva.Image#image
 * @method
 * @param {Number} y
 * @returns {Number}
 * @example
 * // get value
 * var image = shape.image();
 *
 * // set value
 * shape.image(img);
 */
Factory.addGetterSetter(Image, 'image');

Factory.addComponentsGetterSetter(Image, 'crop', ['x', 'y', 'width', 'height']);
/**
 * get/set crop
 * @method
 * @name Konva.Image#crop
 * @param {Object} crop
 * @param {Number} crop.x
 * @param {Number} crop.y
 * @param {Number} crop.width
 * @param {Number} crop.height
 * @returns {Object}
 * @example
 * // get crop
 * var crop = image.crop();
 *
 * // set crop
 * image.crop({
 *   x: 20,
 *   y: 20,
 *   width: 20,
 *   height: 20
 * });
 */

Factory.addGetterSetter(Image, 'cropX', 0, getNumberValidator());
/**
 * get/set crop x
 * @method
 * @name Konva.Image#cropX
 * @param {Number} x
 * @returns {Number}
 * @example
 * // get crop x
 * var cropX = image.cropX();
 *
 * // set crop x
 * image.cropX(20);
 */

Factory.addGetterSetter(Image, 'cropY', 0, getNumberValidator());
/**
 * get/set crop y
 * @name Konva.Image#cropY
 * @method
 * @param {Number} y
 * @returns {Number}
 * @example
 * // get crop y
 * var cropY = image.cropY();
 *
 * // set crop y
 * image.cropY(20);
 */

Factory.addGetterSetter(Image, 'cropWidth', 0, getNumberValidator());
/**
 * get/set crop width
 * @name Konva.Image#cropWidth
 * @method
 * @param {Number} width
 * @returns {Number}
 * @example
 * // get crop width
 * var cropWidth = image.cropWidth();
 *
 * // set crop width
 * image.cropWidth(20);
 */

Factory.addGetterSetter(Image, 'cropHeight', 0, getNumberValidator());
/**
 * get/set crop height
 * @name Konva.Image#cropHeight
 * @method
 * @param {Number} height
 * @returns {Number}
 * @example
 * // get crop height
 * var cropHeight = image.cropHeight();
 *
 * // set crop height
 * image.cropHeight(20);
 */

Collection.mapMethods(Image);
