/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Image.db'; //Nome do banco de dados
const database_version = '1.0'; //Versão do banco de dados
const database_displayname = 'SQLite React Offline Database'; //Nome de exibição do banco de dados
const database_size = 200000; //tamanho do banco de dados

export default class ImgDB {

  Connect() {
    let db;
    return new Promise((resolve) => {
      console.log('Checking plugin integrity ...');
      SQLite.echoTest().then(() => {
        console.log('Integrity Ok ...');
        console.log('Opening Database ...');
        SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
          db = DB;
          console.log('Database Open');
          db.executeSql('SELECT 1 FROM ImagePath LIMIT 1').then(() => {
            console.log('The database is ready... Executing SQL Query...');
          }).catch((error) => {
            console.log('Error Received: ', error);
            console.log('Database is not ready... Creating Data');
            db.transaction((tx) => {
              tx.executeSql('CREATE TABLE IF NOT EXISTS ImagePath (id INTEGER PRIMARY KEY AUTOINCREMENT, filePath TEXT)');
            }).then(() => {
              console.log('Table created successfully');
            }).catch(error => {
              console.log(error);
            });
          });
          resolve(db);
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log('echoTest Failed - plugin not working');
      });
    });
  }

  Desconnect(db) {
    if (db) {
      console.log('Closing Database');
      db.close().then(status => {
        console.log('Database desconnected!!');
      }).catch(error => {
        this.errorCB(error);
      });
    } else {
      console.log('Database connection is close');
    }
  }

  Select() {
    return new Promise((resolve) => {
      const list = [];
      this.Connect().then((db) => {
        db.transaction((tx) => {
          //Query SQL para Select os dados da tabela
          tx.executeSql('SELECT * FROM ImagePath ORDER BY id DESC', []).then(([tx, results]) => {
            console.log('Full consultation');
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              const { id, filePath } = row;
              list.push({ id, filePath });
            }
            console.log(list);
            resolve(list);
          });
        }).then((result) => {
          this.Desconnect(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  SearchById(id) {
    console.log(id);
    return new Promise((resolve) => {
      this.Connect().then((db) => {
        db.transaction((tx) => {
          //Query SQL para buscar as informações do produto
          tx.executeSql('SELECT * FROM ImagePath WHERE id = ?', [id]).then(([tx, results]) => {
            console.log(results);
            if (results.rows.length > 0) {
              let row = results.rows.item(0);
              resolve(row);
            }
          });
        }).then((result) => {
          this.Desconnect(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  Insert(item) {
    return new Promise((resolve) => {
      this.Connect().then((db) => {
        db.transaction((tx) => {
          //Query SQL para inserir um novo produto
          tx.executeSql('INSERT INTO ImagePath (filePath) VALUES (?)', [item.filePath]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.Desconnect(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
