// $(document).onclick(() => $(document).find('.context').toggleClass('hidden', true));
const ctx = $(document).find('#contextcard');
const ellipsctx = $(document).find('#contextcards');
const contexts = $(document).find('.context');

const todayItems = $(document).find('.today-item');

Array.from(todayItems).forEach(el => el.addEventListener('contextmenu', function(e) {
    overrideDefaultContext(e);

    const rect = el.getBoundingClientRect();
    const x = e.clientX + ctx.width() + 20 > window.innerWidth ? e.clientX - ctx.width() - 10 : e.clientX;
    const y = e.clientY - rect.top;

    // Set the position for menu
    ctx.css('top', `${y}px`);
    ctx.css('left', `${x}px`);

    ctx.toggleClass('hidden', false);
    document.addEventListener('click', documentClickHandler, true);
}));

function overrideDefaultContext(event) {
    event.preventDefault();
}

function showEllipsContext() {
    ellipsctx.toggleClass('hidden', false);
    document.addEventListener('click', documentClickHandler, true);
}

var selected = false;
function showCardSelect(option) {
    const select = $(document).find('.cardselect');
    $(document).find('.selectoption').toggleClass('hidden', selected);
    select.toggleClass('hidden', selected);
    $(option).toggleClass('rounded-xl', selected)
    if (!selected) {
        $(option).html('Deselect all');
    } else {
        select.prop('checked', false);
        $(option).html('Select...');
    }
    selected = !selected;
}

const documentClickHandler = function(e) {
    var isClickedOutside = false;
     Array.from(contexts).forEach(ctx => isClickedOutside = !ctx.contains(e.target));
    if (isClickedOutside) {
        // Hide the menu
        contexts.toggleClass('hidden', true);

        // Remove the event handler
        document.removeEventListener('click', documentClickHandler, true);
    }
}

function toNewCard() {
    window.location.href = 'newcard.html';
}