package com.quipolicy_analyzer.util.funciones;

import java.io.File;
import java.net.URL;

public class UbicacionJar {
  private static File WORKING_DIRECTORY;

  public static File get() {
    String Recurso = UbicacionJar.class.getSimpleName() + ".class";
    if (WORKING_DIRECTORY == null) {
      try {
        URL url = UbicacionJar.class.getResource(Recurso);
        if (url.getProtocol().equals("file")) {
          File f = new File(url.toURI());
          do {
            f = f.getParentFile();
          } while (!f.isDirectory());
          WORKING_DIRECTORY = f;
        } else if (url.getProtocol().equals("jar")) {
          String expected = "!/" + Recurso;
          String s = url.toString();
          s = s.substring(4);
          s = s.substring(0, s.length() - expected.length());
          File f = new File(new URL(s).toURI());
          do {
            f = f.getParentFile();
          } while (!f.isDirectory());
          WORKING_DIRECTORY = f;
        }
      } catch (Exception e) {
        WORKING_DIRECTORY = new File(".");
      }
    }
    return WORKING_DIRECTORY;
  }

  public static String rutaLocal() {
    String Recurso = UbicacionJar.class.getSimpleName() + ".class";
    if (WORKING_DIRECTORY == null) {
      try {
        URL url = UbicacionJar.class.getResource(Recurso);
        if (url.getProtocol().equals("file")) {
          File f = new File(url.toURI());
          do {
            f = f.getParentFile();
          } while (!f.isDirectory());
          WORKING_DIRECTORY = f;
        } else if (url.getProtocol().equals("jar")) {
          String expected = "!/" + Recurso;
          String s = url.toString();
          s = s.substring(4);
          s = s.substring(0, s.length() - expected.length());
          File f = new File(new URL(s).toURI());
          do {
            f = f.getParentFile();
          } while (!f.isDirectory());
          WORKING_DIRECTORY = f;
        }
      } catch (Exception e) {
        WORKING_DIRECTORY = new File(".");
      }
    }
    String ruta = WORKING_DIRECTORY.getPath();
    return ruta.substring(0, 2);
  }

}