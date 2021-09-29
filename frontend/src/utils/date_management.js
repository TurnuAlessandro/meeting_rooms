import moment from "moment"



const NOMI_GIORNI_SETTIMANA = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const NOMI_GIORNI_SETTIMANA_FULL = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const NOMI_MESI = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
const NOMI_MESI_FULL = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']


const getFirstDayOfThisWeek = () => moment().startOf('week').add(1, 'days')


export {
    getFirstDayOfThisWeek
}
export {
    NOMI_MESI,
    NOMI_GIORNI_SETTIMANA,
    NOMI_GIORNI_SETTIMANA_FULL,
    NOMI_MESI_FULL
}