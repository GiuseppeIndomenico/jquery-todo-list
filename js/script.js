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

    showEmptyMessage();

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
            showEmptyMessage();
        });

        li.find('.modify').click(function () {
            let listItem = $(this).closest('li');
            let textElement = listItem.find('.text');
            let liText = textElement.text();
            let originalText = liText;

            let input = $('<input type="text" class="edit-input">').val(liText);
            let cancelButton = $('<div class="btn btn-outline-secondary cancel"><i class="fa-solid fa-times"></i></div>');
            let confirmButton = $('<div class="btn btn-outline-success confirm"><i class="fa-solid fa-check"></i></div>');

            textElement.replaceWith(input);
            listItem.find('.btn-group').empty().append(cancelButton, confirmButton);

            input.focus();

            cancelButton.click(function () {
                input.replaceWith(textElement);
                listItem.find('.btn-group').empty().append('<div class="btn btn-outline-warning modify"><i class="fa-solid fa-pencil"></i></div>', '<div class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></div>');
                configureListItemEvents(listItem);
            });

            confirmButton.click(function () {
                let newText = input.val().trim();
                if (newText !== '') {
                    textElement.text(newText);
                }
                input.replaceWith(textElement);
                listItem.find('.btn-group').empty().append('<div class="btn btn-outline-warning modify"><i class="fa-solid fa-pencil"></i></div>', '<div class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></div>');
                configureListItemEvents(listItem);
            });

            input.on('keypress', function (event) {
                if (event.which === 13) {
                    confirmButton.click();
                }
            });
        });
    }

    function addListItem(liText) {
        liText = liText.trim();
        if (liText !== '') {
            let newLi = $('<li>').html(`
                <div class="d-flex align-items-center">
                    <span class="check">&check;</span> <span class="text">${liText}</span>
                </div>
                <div class="btn-group">
                    <div class="btn btn-outline-warning modify"><i class="fa-solid fa-pencil"></i></div>
                    <div class="btn btn-outline-danger delete"><i class="fa-solid fa-trash"></i></div>
                </div>
            `);

            list.append(newLi);
            text.val('');

            configureListItemEvents(newLi);
            showEmptyMessage();
        }
    }

    btnCreate.click(function () {
        let liText = text.val();
        addListItem(liText);
    });

    list.on('click', '.delete', function () {
        $(this).closest('li').remove();
        showEmptyMessage();
    });

    btnReset.click(function () {
        text.val('');
    });

    configureListItemEvents(list.find('li'));
});
