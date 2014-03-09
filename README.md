jquery.login
============

A simple library for ajax login forms using jQuery.

## usage

### markup
```html
  <form action="/signin" method="POST">
    <input type="text" name="username" />
    <input type="password" name="password" />
    
    <input type="submit" value="Sign In"/>
  </form>
```

### code
```javascript
  $('form').loginForm({
  	success: function(data) {
  		console.log('yay');
  	},
  	unauthorized: function(data, msg) {
  		console.log('unauthorized');
  	},
  	error: function(data, msg) {
  		console.log(msg);
  	}
  });
```

### options
```javascript
$().loginForm({
  url: '/foo', // defaults to form action
  method: 'PUT', // defaults to form method
  parameters: { // defaults to this
    username: '[name=username]',
    password: '[name=password]'
  },

  success: function(data){},
  unauthorized: function(data, msg){},
  error: function(data, msg){}
});
```
