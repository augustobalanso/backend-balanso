Desafio 11 - Sessions in Mongo

FUNCIONA:

- Mongo funcional tanto para sessions como para registro y checkexists de usuarios.

NO FUNCIONA: 

- Sessions se resetea con cada request y no me permite acceder a la propiedad isAuth asignada a la session durante el post a /login. Por ende todos los chequeos posteriores para acceder a la app no son accesibles
