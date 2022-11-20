# Move the app.js file to the global directory to properly demonstrate.

# When app.js is requiring 'greet' it will look for it in the greet folder, if a 'greet.js' file isn't found, it will instead look for an 'index.js' file.

# This pattern allows you to break up and modularize your code even further.

# Note both 'english.js' and 'spanish.js' are using identical functions with identical names. The variable names are protected within the scope of each of those functions. module.exports is wrapping each function to it's own scope and prevents it's variable names from bleeding out through the rest of the application.

# 'module' is an object with an 'exports' property which in this case will contain two methods: 'english' and 'spanish'.

# They will be made available in the main 'app.js' file through the 'greet' functions prototype as both 'english' and 'spanish' methods exist on the same 'exports' object.