package com.quipolicy_analyzer.util.funciones;

import com.quipolicy_analyzer.util.variables.Constantes;
import lombok.extern.slf4j.Slf4j;
/*
import org.apache.commons.codec.Charsets;
import org.apache.commons.lang3.StringUtils;
*/
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

@Slf4j
public class Java8Base64Image {  public static void main(String[] args) {
  String imagePath = "C:\\base64\\image.jpg";
  log.info("=================Encoder Image to BASE 64!=================");
  String base64ImageString = encoder(imagePath);
  log.info("Base64ImageString = " + base64ImageString);
  log.info("=================Decoder Base64ImageString to Image!=================");
  decoder(base64ImageString, "C:\\base64\\decoderimage.jpg");
  log.info("DONE!");
}

  public static String encoderString(byte[] imageData) {
    String base64Image = Base64.getEncoder()
        .encodeToString(imageData);
    return base64Image;
  }
/*
  public static String convertStringToBase64(String dataString) {
    String base64Image = "";
    try {
      ImageIO.setCacheDirectory(new File(Constantes.RUTAS.IMAGENES.TEMPORAL));
      ByteArrayInputStream in = new ByteArrayInputStream(dataString.getBytes(Charsets.ISO_8859_1));
      BufferedImage bImage = ImageIO.read(in);
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      ImageIO.write(bImage, "jpg", bos);
      byte[] data = bos.toByteArray();
      base64Image = encoderString(data);
      log.info("convertStringToBase64 :: " + base64Image);
    } catch (FileNotFoundException e) {
      log.error(e.getMessage(), e);
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
    return base64Image;
  }
*/
  public static String encoder(String imagePath) {
    String base64Image = "";
    File file = new File(imagePath);
    try (FileInputStream imageInFile = new FileInputStream(file)) {
      // Reading a Image file from file system
      byte imageData[] = new byte[(int) file.length()];
      imageInFile.read(imageData);
      base64Image = Base64.getEncoder()
          .encodeToString(imageData);
    } catch (FileNotFoundException e) {
      log.info("Image not found" + e);
    } catch (IOException ioe) {
      log.info("Exception while reading the Image " + ioe);
    }
    return base64Image;
  }

  public static void decoder(String base64Image, String pathFile) {
    try (FileOutputStream imageOutFile = new FileOutputStream(pathFile)) {
      // Converting a Base64 String into Image byte array
      byte[] imageByteArray = Base64.getDecoder()
          .decode(base64Image);
      imageOutFile.write(imageByteArray);
    } catch (FileNotFoundException e) {
      log.info("Image not found" + e);
    } catch (IOException ioe) {
      log.info("Exception while reading the Image " + ioe);
    }
  }

  public static void eliminaArchivo(String ruta) {
    File fichero = new File(ruta);
    if (fichero.exists()) {
      if (fichero.delete()) {
        log.debug("El fichero " + ruta + " ha sido borrado satisfactoriamente");
      } else {
        log.error("El fichero " + ruta + " no puede ser borrado");
      }
    } else {
      log.error("El fichero " + ruta + " no existe");
    }
  }
/*
  public static String convertStringToBytes(String cadena) {
    // Check encoded sizes
    final byte[] utf8Bytes;
    String bytesOfString = "";
    try {
      utf8Bytes = cadena.getBytes("UTF-8");
      bytesOfString = StringUtils.leftPad("" + utf8Bytes.length, 9, "0");
    } catch (UnsupportedEncodingException e) {
      log.error("UnsupportedEncodingException", e);
    }

    return bytesOfString;
  }

 */
}
