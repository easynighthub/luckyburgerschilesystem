var ingresarAdmin = document.getElementById('signIn');




ingresarAdmin.addEventListener('click', function() {

    console.log("ola");
   // document.getElementById('BarraCargando').style.display = 'block';
    //document.getElementById('signIn').style.display = 'none';

    var email = document.getElementById('inputEmail').value;
    email = email +'@abcs.cl';
    console.log(email)
    var password = document.getElementById('inputPassword').value;

     firebase.auth().signInWithEmailAndPassword(email, password).then(
      function(s){
         console.log(s.user);
    firebase.database().ref('/admin/' + s.user.uid).once('value').then(function(snapshot) {
   if (snapshot.val() != null)
    window.location.href = 'app';
    else {
   alert('');
   firebase.auth().signOut();
  }
  });
  },
   function(e) {
      console.log(e);
  alert('#');
  }
  );
});