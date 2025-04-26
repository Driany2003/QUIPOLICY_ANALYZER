package com.quipolicy_analyzer.util.funciones;

import com.quipolicy_analyzer.util.variables.Constantes;
import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Slf4j
public class DateUtil {

  public static final String FORMAT_SHORT_DATE = "yyyy-MM-dd";
  public static final String FORMAT_DATE_HOUR_SECONDS_SISTEMA_SQL = "yyyy-MM-dd HH:mm:ss";
  public static final String FORMAT_HOUR_24 = "HH:mm:ss";

  private DateUtil() {
    super();
  }

  public static Calendar strDateToCalendar(String sDate) {
    Calendar date;
    if (sDate.trim().length() == 10) {
      int year = Integer.parseInt(sDate.substring(6, 10));
      int month = Integer.parseInt(sDate.substring(3, 5)) - 1;
      int day = Integer.parseInt(sDate.substring(0, 2));

      date = new GregorianCalendar(year, month, day, 23, 59);

      return date;

    }
    return null;
  }

  public static long getDiffenceInDays(Date date1, Date date2) {
    long dDays = 0;
    final long ONE_DAY = 60 * 60 * 24 * 1000;
    if (date1.after(date2)) {
      dDays = -(date1.getTime() - date2.getTime()) / ONE_DAY;
    } else {
      dDays = (date2.getTime() - date1.getTime()) / ONE_DAY;
    }

    return dDays;
  }

  public static boolean isSameDay(Date date1, Date date2) {
    Calendar c1 = Calendar.getInstance();
    Calendar c2 = Calendar.getInstance();
    c1.setTime(date1);
    c2.setTime(date2);

    return c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR) && c1.get(Calendar.MONTH) == c2.get(Calendar.MONTH) && c1.get(Calendar.DAY_OF_YEAR) == c2.get(Calendar.DAY_OF_YEAR);
  }

  public static String getFormatoFecha(String fecha) throws ParseException {
    Date dato = new SimpleDateFormat(FORMAT_SHORT_DATE).parse(fecha);
    new Date(fecha);
    return getDate(dato, FORMAT_SHORT_DATE);
  }

  public static String getFormatoHora(String hora) throws ParseException {
    Date dato = new SimpleDateFormat(FORMAT_SHORT_DATE).parse(hora);
    new Date(hora);
    SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_HOUR_24);
    return sdf.format(dato);
  }

  public static String datoHora() {
    SimpleDateFormat sdf = new SimpleDateFormat(FORMAT_HOUR_24);
    return sdf.format(new Date());
  }

  public static String getDate(String format) {
    SimpleDateFormat sdf = new SimpleDateFormat(format);
    return sdf.format(new Date());
  }

  public static String getDate(Date date, String format) {
    SimpleDateFormat sdf = new SimpleDateFormat(format);
    return sdf.format(date);
  }

  public static String getDateForFileName() {
    SimpleDateFormat sdf = new SimpleDateFormat("ddMMyyyyhhmmss");
    return sdf.format(new Date());
  }

  public static String getHour(Date date, String format) {
    SimpleDateFormat sdf = new SimpleDateFormat(format);
    return sdf.format(date);
  }

  // Suma los dIas recibidos a la fecha
  public static String sumarRestarDiasFecha(String fecha, Integer dias, String pattern) {
    String datetime = LocalDate.parse(fecha, DateTimeFormatter.ofPattern(pattern)).plusDays(dias).format(DateTimeFormatter.ofPattern(FORMAT_SHORT_DATE));
    log.info("Fecha sumarRestarDiasFecha : " + fecha + " --> " + dias + " --> " + datetime);
    return datetime; // Devuelve el objeto Date con los nuevos días añadidos
  }

  public static String fechaMes(int m) {
    switch (m) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Setiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      default:
        return "Diciembre";
    }
  }

  public static String fechaActual() {
    return LocalDateTime.now().format(DateTimeFormatter.ofPattern(FORMAT_SHORT_DATE));
  }

  public static String fechaYHoraActual() {
    return LocalDateTime.now().format(DateTimeFormatter.ofPattern(FORMAT_DATE_HOUR_SECONDS_SISTEMA_SQL));
  }

  public static Date fechaStringToDate(String fecha) throws Exception {
    Date date1 = new SimpleDateFormat(FORMAT_SHORT_DATE).parse(fecha);
    return date1;
  }

  public static String horaSistema() {
    Long currentTime = System.currentTimeMillis();
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FORMAT_HOUR_24);
    Date date = new Date(currentTime);
    String time = simpleDateFormat.format(date);
    log.info("Hora del Sistema :: " + time);
    return time;
  }

  public static Double getDifferenceBetwenHours(String tipoMarcacion, String uaHora) throws ParseException {
    SimpleDateFormat format = new SimpleDateFormat(FORMAT_HOUR_24);
    Date horaIngreso = format.parse(Constantes.HORA_TRABAJO.INGRESO);
    Date horaSalida = format.parse(Constantes.HORA_TRABAJO.SALIDA);
    Date horaMarcacion = format.parse(uaHora);
    Double tiempoTranscurrido = 0.0;

    if (tipoMarcacion.equalsIgnoreCase("INGRESO")) {
      if (horaIngreso.getTime() < horaMarcacion.getTime()) {
        //3600000  es el valor en milisegundos de una hora..
        int tempresta = (int) (horaMarcacion.getTime() - horaIngreso.getTime());
        tiempoTranscurrido = Math.rint(((double) tempresta / 3600000) * 100) / 100;
      }
    } else if (tipoMarcacion.equalsIgnoreCase("SALIDA")) {
      if (horaSalida.getTime() > horaMarcacion.getTime()) {
        //3600000  es el valor en milisegundos de una hora..
        int tempresta = (int) (horaSalida.getTime() - horaMarcacion.getTime());
        tiempoTranscurrido = Math.rint(((double) tempresta / 3600000) * 100) / 100;
      }
    }

    log.info("Tiempo de Diferencia :: " + tiempoTranscurrido);
    return tiempoTranscurrido;
  }



  /**
   * Devuelve los días entre fecha de vencimiento y actual
   *
   * @param fechaHasta
   * @return
   */
  public static Integer diasParaVencimiento(Date fechaHasta) {
    if (fechaHasta == null) {
      return null; // O retorna un valor predeterminado, por ejemplo 0
    }

    long startTime = System.currentTimeMillis();
    long endTime = fechaHasta.getTime();
    long diasDesde = (long) Math.floor(startTime / (1000 * 60 * 60 * 24));
    long diasHasta = (long) Math.floor(endTime / (1000 * 60 * 60 * 24));
    long dias = diasHasta - diasDesde;
    return Math.toIntExact(dias);
  }


}
