package com.quipolicy_analyzer.util.funciones;

import com.quipolicy_analyzer.util.variables.Constantes;
import lombok.extern.slf4j.Slf4j;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;

@Slf4j
public class ImageBytes {

  public static void byteArrayToImage() {
    try {
      ImageIO.setCacheDirectory(new File(Constantes.RUTAS.IMAGENES.TEMPORAL));
      BufferedImage bImage = ImageIO.read(new File(Constantes.RUTAS.IMAGENES.imageIn));
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ImageIO.write(bImage, "jpg", bos);
      byte[] data = bos.toByteArray();
      ByteArrayInputStream bis = new ByteArrayInputStream(data);
      BufferedImage bImage2 = ImageIO.read(bis);
      ImageIO.write(bImage2, "jpg", new File(Constantes.RUTAS.IMAGENES.imageOut));
      log.info("byteArrayToImage :: Imagen creada");
    } catch (FileNotFoundException e) {
      log.error(e.getMessage(), e);
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
  }

  public static void stringToImageNew(String data, String fileName) {
    try {
      String myFile = Constantes.RUTAS.IMAGENES.imageOutNew + fileName;
      log.info("RECIBIDO Filename :: " + myFile);
      File myFileOut = new File(myFile);
      OutputStream out = new FileOutputStream(myFileOut);
      try {
        out.write(data.getBytes()); // Just dump the database content to disk
      } finally {
        out.close();
      }
      //      ImageIO.write(ImageIO.read(new ByteArrayInputStream(data)), "jpg", new File(myFile));
      log.info("byteArrayToImageNew :: Imagen creada");
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
  }

  public static void byteArrayToImageNew(byte[] data, String fileName) {
    try {
      String myFile = Constantes.RUTAS.IMAGENES.imageOutNew + fileName;
      log.info("RECIBIDO :: " + data + " :: " + myFile);
      ImageIO.setUseCache(true);
      ImageIO.setCacheDirectory(new File(Constantes.RUTAS.IMAGENES.TEMPORAL));
      BufferedImage image = ImageIO.read(new ByteArrayInputStream(data));
      ImageIO.write(image, "jpg", new File(myFile)); // Just dump the database content to disk
      //ImageIO.write(ImageIO.read(new ByteArrayInputStream(data)), "jpg", new File(myFile));
      log.info("byteArrayToImageNew :: Imagen creada");
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
  }

  public static byte[] imageToByteArray() {
    byte[] data = null;
    try {
      BufferedImage bImage = ImageIO.read(new File(Constantes.RUTAS.IMAGENES.imageIn));
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ImageIO.write(bImage, "jpg", bos);
      data = bos.toByteArray();
      log.info("imageToByteArray :: Imagen :: " + data);
    } catch (FileNotFoundException e) {
      log.error(e.getMessage(), e);
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
    return data;
  }

  public static byte[] convertStringToBytes(String dataString) {
    byte[] data = null;
    try {
      ImageIO.setCacheDirectory(new File(Constantes.RUTAS.IMAGENES.TEMPORAL));
      ByteArrayInputStream in = new ByteArrayInputStream(dataString.getBytes());
      BufferedImage bImage = ImageIO.read(in);
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ImageIO.write(bImage, "jpg", bos);
      data = bos.toByteArray();
      log.info("imageStringToByteArray :: Imagen :: " + data);
    } catch (FileNotFoundException e) {
      log.error(e.getMessage(), e);
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
    log.info("RECIBIDO :: " + dataString.substring(0, 10) + " :: BYTES :: " + data);
    return data;
  }

}
