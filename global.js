var path = require('path');

//global variables
global.base_dir = __dirname;

global.uploadFilePath = global.base_dir + '/public/upload/';


global.__app = {
    __routes: {},
    __root: {
        __routes: path.join(base_dir, '/routes'),
        __setting: path.join(base_dir, '/setting'),
    }
};
global.__app.__setting = {
    render_setting: path.join(__app.__root.__setting, 'default_page_render'),
};
