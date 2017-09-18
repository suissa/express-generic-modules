const fs = require( 'fs' )

const API_BASE_PATH = '/api/'
const MODULES_BASE_PATH = './modules/'

const byModuleRules = ( file ) => 
  !( file.startsWith( '_' ) || file.startsWith( '.' ) )

const listFilesIn = ( path ) => fs.readdirSync( path ).filter( byModuleRules )
const transformToRouteName = ( name ) => name.toLowerCase() + 's'

const createModules = ( app, router ) => ( modules ) => 
  modules.map( ( name ) => 
    app.use( ...[ 
      API_BASE_PATH + transformToRouteName( name ), 
      require( MODULES_BASE_PATH + name + '/routes' )( router )
    ] )
  )

module.exports = ( app, router ) => ({ 
  createModules: createModules( app, router ), 
  listFilesIn 
})