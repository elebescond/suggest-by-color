import str from 'string-to-stream'

const MOCK_CSV_CONTENT = 'id;title;gender_id;composition;sleeve;photo;url\n\
L1212-00-001;Polo Lacoste L.12.12 uni;MAN;100% Coton;Manches courtes;//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/L1212_001_24.jpg?sw=458&sh=443;https://www.lacoste.com/fr/lacoste/homme/vetements/polos/polo-lacoste-l.12.12-uni/L1212-00.html?dwvar_L1212-00_color=001\n\
L1212-00-031;Polo Lacoste L.12.12 uni;MAN;100% Coton;Manches courtes;//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/L1212_031_24.jpg?sw=458&sh=443;https://www.lacoste.com/fr/lacoste/homme/vetements/polos/polo-lacoste-l.12.12-uni/L1212-00.html?dwvar_L1212-00_color=031\n\
L1212-00-132;Polo Lacoste L.12.12 uni;MAN;100% Coton;Manches courtes;//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/L1212_132_24.jpg?sw=458&sh=443;https://www.lacoste.com/fr/lacoste/homme/vetements/polos/polo-lacoste-l.12.12-uni/L1212-00.html?dwvar_L1212-00_color=132\n\
L1212-00-166;Polo Lacoste L.12.12 uni;MAN;100% Coton;Manches courtes;//image1.lacoste.com/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-FR-Site/Sites-master/default/L1212_166_24.jpg?sw=458&sh=443;https://www.lacoste.com/fr/lacoste/homme/vetements/polos/polo-lacoste-l.12.12-uni/L1212-00.html?dwvar_L1212-00_color=166';

export default {
    get: (url) => str(MOCK_CSV_CONTENT)
}
