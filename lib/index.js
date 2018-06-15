let fs = require('fs');
let path = require('path');
let root = process.cwd();

// import bower config
let bower = {directory:'bower_components'};
try{
    bower = JSON.parse(
        fs.readFileSync(
            path.join(root,'.bowerrc'),
            'UTF-8'
        )
    );
}catch(ex){
    // ignore
}

// check bower module name
let getBowerModule = function (name) {
    let file = path.join(root,bower.directory,name);
    if (!fs.existsSync(file)){
        return;
    }
    // check main file
    let conf = {};
    try{
        conf = require(path.join(file,'bower.json'));
    }catch (ex) {
        // ignore
    }
    if (!conf.main){
        return file;
    }
    // check export file
    let exp = path.join(file, conf.main);
    if (fs.existsSync(exp)){
        return exp;
    }
};

// get relative bower module
let getRelativeBowerModule = function (abs, file) {
    if (!file||file==='unknown'){
        return abs;
    }
    if (!path.isAbsolute(file)){
        file = path.join(root, file);
    }
    return path.relative(
        path.dirname(file), abs
    );
};

// transform bower module path
module.exports = function ({ types: t }) {
    return {
        visitor: {
            'ImportDeclaration|ExportDeclaration': function (crtPath, state) {
                let srcPath = crtPath.get('source');
                if (srcPath.type!=='StringLiteral'){
                    return;
                }
                // check module name
                let name = srcPath.node.value;
                let bmdl = getBowerModule(name);
                if (!bmdl){
                    return;
                }
                // cal relative module path
                let mstr = getRelativeBowerModule(
                    bmdl, state.file.opts.filename
                );
                mstr = mstr.replace(/[\\]+/g,'/');
                // replace module path
                srcPath.replaceWith(
                    t.stringLiteral(mstr)
                );
            }
        }
    };
};