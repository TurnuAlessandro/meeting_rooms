const EVENT_STATE = {
    DA_APPROVARE: 'DA_APPROVARE',
    CONFERMATO: 'CONFERMATO',
    IN_CANCELLAZIONE: 'IN_CANCELLAZIONE',
    SCADUTO: 'SCADUTO',
    CANCELLATO: 'CANCELLATO',
    REVOCATO: 'REVOCATO'
}
const EVENT_STATE_LABELS = {
    DA_APPROVARE: {
        user: 'Da approvare',
        admin: 'In approvazione'
    },
    CONFERMATO: {
        user: 'Confermato',
        admin: 'Confermato'
    },
    IN_CANCELLAZIONE: {
        user: 'In attesa di cancellazione',
        admin: 'Approva cancellazione'
    },
    SCADUTO: {
        user: 'Scaduto',
        admin: 'Scaduto'
    },
    CANCELLATO: {
        user: 'Cancellato',
        admin: 'Cancellato'
    },
    REVOCATO: {
        user: 'Revocato',
        admin: 'Revocato'
    }
}

const EVENT_STATE_BACK_COLORS = {
    CONFERMATO: 'rgb(38,167,1)',
    DA_APPROVARE: 'rgb(36,252,32)',
    IN_CANCELLAZIONE: 'IN_CANCELLAZIONE',
    SCADUTO: 'rgb(40,2,2)',
    CANCELLATO: 'rgb(80,86,80)',
    REVOCATO: 'rgb(130,130,130)'
}
const EVENT_STATE_TEXT_COLORS = {
    CONFERMATO: 'white',
    DA_APPROVARE: 'black',
    IN_CANCELLAZIONE: 'black',
    SCADUTO: 'white',
    CANCELLATO: 'white',
    REVOCATO: 'white'
}

export {EVENT_STATE, EVENT_STATE_BACK_COLORS, EVENT_STATE_LABELS, EVENT_STATE_TEXT_COLORS}