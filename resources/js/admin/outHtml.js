//import $ from "jquery";

export default function OutHtml(answer, out) {



    let pag = paginate(answer.last_page, answer.current_page);
    if(out === 'table-page')  outPageSearch(answer.data, pag);
    if(out === 'group-brands')  outBrandsSearch(answer.data, pag);

}

function outPageSearch(data, pag) {


    let table = document.querySelector('.table-elements tbody');
    let paginate =  document.querySelector('.paginate');

    let html ='';
    data.map(function(elem){


        html += `<tr>
        <td><a href="/imperia_admin_panel/pages/${elem.id}/edit">${elem.page_name}</a></td>
        <td>${elem.page_alias}</td>
        <td>${elem.updated_at}</td>
        <td style="width:15px; text-align: center;">
            <a class="delete-element delete-link" href="/imperia_admin_panel/pages/${elem.id}">
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z"/>
                </svg>
            </a>
        </td>
        </tr>`;
    });
    if(html === '') html = 'Нет элементов';

    table.innerHTML = html;
    paginate.innerHTML = pag;

}
function outBrandsSearch(data, pag) {


    let groupList = document.querySelector('.group-elements');
    let paginate =  document.querySelector('.paginate');


    let html ='';
    let img;
    data.map(function(elem){
        if(elem.brand_logo ) img = "/public/images/brands/" + elem.brand_logo.min;
        else img = "    /public/images/admin/noimg.png";

        html += `
        <li class="group-elements-item">
        
        <img src="${img}" alt="">
        <h3 class="group-elements-item_title">${elem.brand_name}</h3>

        <div class="group-elements-item_footer">
            <span class="group-elements-item_date">${elem.created_at}</span>
            <a class="edit-link" href="http://imperiya.loc/imperia_admin_panel/brands/${elem.brand_id}/edit">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.54975 11.2C2.58475 11.2 2.61975 11.1965 2.65475 11.1913L5.59825 10.675C5.63325 10.668 5.6665 10.6523 5.691 10.626L13.1092 3.20775C13.1255 3.19156 13.1383 3.17233 13.1471 3.15116C13.1559 3.12999 13.1604 3.10729 13.1604 3.08438C13.1604 3.06146 13.1559 3.03876 13.1471 3.01759C13.1383 2.99642 13.1255 2.97719 13.1092 2.961L10.2008 0.05075C10.1675 0.0175 10.1237 0 10.0765 0C10.0292 0 9.9855 0.0175 9.95225 0.05075L2.534 7.469C2.50775 7.49525 2.492 7.52675 2.485 7.56175L1.96875 10.5052C1.95173 10.599 1.95781 10.6955 1.98647 10.7864C2.01514 10.8772 2.06552 10.9597 2.13325 11.0267C2.24875 11.1387 2.394 11.2 2.54975 11.2V11.2ZM3.72925 8.148L10.0765 1.8025L11.3592 3.08525L5.012 9.43075L3.45625 9.7055L3.72925 8.148V8.148ZM13.44 12.67H0.56C0.25025 12.67 0 12.9203 0 13.23V13.86C0 13.937 0.063 14 0.14 14H13.86C13.937 14 14 13.937 14 13.86V13.23C14 12.9203 13.7498 12.67 13.44 12.67Z"></path>
                </svg>
            </a>
            <a class="delete-element delete-link" href="http://imperiya.loc/imperia_admin_panel/brands/${elem.brand_id}/">
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z"></path>
                </svg>
            </a>
        </div>
    </li>
        `;
    });
    if(html === '') html = 'Нет элементов';

    groupList.innerHTML = html;
    paginate.innerHTML = pag;

}

function paginate(last, active =1){

    if(last <= 1) return '';

    let html = "";
    for(let i = 1; i <= last;i++){
        let cl='paginate-item';
        if(active === i) cl = 'paginate-item active';

        html += `<div data-page="${i}" class="${cl}">${i}</div>`;
    }
    html += "";
    return html;

}


