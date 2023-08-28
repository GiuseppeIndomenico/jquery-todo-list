$(document).ready(function () {
    let btnCreate = $('.btn-danger');
    let btnReset = $('.btn-warning');
    let text = $('#textInput');
    let list = $('#list');
    let emptyMessage = $('<li>Inizia a scrivere la tua Todo List</li>');

    function showEmptyMessage() {
        if (list.find('li').length === 0) {
            emptyMessage.appendTo(list);
        } else {
            emptyMessage.detach();
        }
    }

    showEmptyMessage(); // Mostra il messaggio iniziale

    text.on('keypress', function (event) {
        if (event.which === 13) {
            btnCreate.click();
        }
    });

    function configureListItemEvents(li) {
        li.find('.check').click(function () {
            $(this).toggleClass('checked');
        });

        li.find('.delete').click(function () {
            li.remove();
            showEmptyMessage(); // Mostra il messaggio se la lista è vuota dopo la rimozione
        });
    }

    function addListItem(liText) {
        liText = liText.trim(); // Rimuovi spazi vuoti da inizio e fine
        if (liText !== '') {
            let newLi = $('<li>').html(`
                <div class="d-flex align-items-center">
                    <span class="check">&check;</span> ${liText}
                </div>
                <div class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></div>
            `);

            list.append(newLi);
            text.val('');

            configureListItemEvents(newLi);
            showEmptyMessage(); // Nascondi il messaggio iniziale dopo l'aggiunta di un elemento
        }
    }

    btnCreate.click(function () {
        let liText = text.val();
        addListItem(liText);
    });

    // Aggiungi il gestore di eventi click per l'eliminazione degli elementi esistenti
    list.on('click', '.delete', function () {
        $(this).closest('li').remove();
        showEmptyMessage(); // Mostra il messaggio se la lista è vuota dopo la rimozione
    });

    btnReset.click(function () {
        text.val('');
    });
});
