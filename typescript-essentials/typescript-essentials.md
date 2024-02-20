# My TypeScript Journey: Earned Badges 🏆

## Badges Overview

Here is a collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/HYLMD7G8?sharingId=E9AEFE2B2330E081)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/FZ9B3RDX?sharingId=E9AEFE2B2330E081)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/EJAUMH6P?sharingId=E9AEFE2B2330E081)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/8RGKZACW?sharingId=E9AEFE2B2330E081)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/FZ9SCYUX?sharingId=E9AEFE2B2330E081)
6. **Generics in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/N797RDWF?sharingId=E9AEFE2B2330E081)
7. **Work with External Libraries in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/WACAVD9N?sharingId=E9AEFE2B2330E081)
8. **Organize Code with Namespaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/IrinaFileva-6298/EJ75M23P?sharingId=E9AEFE2B2330E081)


## Reflections ✍

### 1. Getting Started with TypeScript 📌
   
**Key learnings:**

TypeScript is an open source language developed by Microsoft. It is an extended version of JavaScript, with certain features that were previously unavailable.\
The main feature of TypeScript is its type system. In TypeScript, you can determine the data type of a variable or parameter by using a type hint.\
Type hints describe the form of an object, which provides better documentation and allows TypeScript to check that your code is working correctly.\
Through static type checking, TypeScript detects code problems early in development that JavaScript normally can't detect until the code is run in a browser.\
TypeScript has more coding features that JavaScript doesn't have:
+ Interfaces
+ Namespaces
+ Generics
+ Abstract classes
+ Data modifiers
+ Options
+ Function overloading
+ Decorators
+ Enter utilities
+ read-only keyword

Browsers only understand JavaScript. For an application written in TypeScript to work, you must compile the code and convert it to JavaScript.<br> 
TypeScript code is converted to JavaScript code using a TypeScript compiler or a TypeScript-compatible transpiler.\
Using compiler parameters, you can control the creation of JavaScript from the original TypeScript.<br> 
You can set the parameters either on the command line or in a JSON file named tsconfig.json.\
Numerous compiler parameters are available

**Skills learned:**
+ Installing the TypeScript compiler in VC Code.
+ Creating a tsconfig.json file.
+ Modifying a few parameters in the tsconfig.json file.
+ Compiled my first TypeScript file.

**How to use them:**
The knowledge gained in this module introduced me to the new TypeScript language, its features and benefits.<br>
In future projects, I will use this knowledge to create projects in TypeScript,<br> 
to identify code problems early in the development process and utilize the features of this language.

### 2. Declare Variable Types in TypeScript 📌

**Key learnings:**

The main advantage of TypeScript is that it allows you to add static types to your JavaScript code.<br> 
Types impose static constraints on program objects such as functions, variables, and properties,<br> 
so that compilers and development tools can provide better validation and assistance during development.

You can associate types with variables through explicit type annotations or through implicit type inference.

All types in TypeScript are subtypes of a single upper type called the any type. <br> 
The any type is the only type that can represent any JavaScript value without restriction.

All other types are subdivided into:
+ primitive types(boolean, number, string, void, null, undefined) as well as enum types.
+ object types (all types of classes, interfaces, arrays and literals)
+ type parameters. 

Class and interface types can be generic types with one or more type parameters.

Union and Intersection types help handle situations where a type consists of two or more possible types.<br>
Literal types allow you to restrict the values assigned to a type to a narrow list of parameters.

If you need to treat a variable as another data type, you can use a type assertion .<br>
A type assertion tells TypeScript that all necessary special checks have been performed before calling a statement.

**Skills learned:**

+ understanding of what types and subtypes there are in TypeScript
+ implementation of types and subtypes for functions and variables
+ understanding of the use of types any and unknown in the moments of development of the year, when the type is not known
+ understanding of the use of literal types to restrict the values assigned to a type to a narrow list of parameters.

**How to use them:**

After taking this module, I learned what types and subtypes of data are available in TypeScript. <br>
I learned how and in what situations to use this information. I learned how to declare the type of a variable and function.<br>
In the future it will help me to assign the correct type to a variable or function.

### 3. Implement Interfaces in TypeScript 📌

**Key learnings:**

In TypeScript, interfaces perform implicit type naming and are an effective way to define a "code contract" in code, as well as code contracts outside the project.

Interfaces can be used to describe an object, to name and parameterize object types, and to compose existing named object types into new ones.

Interface properties can be mandatory, optional, or read-only.

Once an interface is defined, it can be used as a type and get all the benefits of type checking and IntelliSense.

An interface can be used for the following purposes:

+ Creating abbreviated names for commonly used types. 
+ Disk consistency across a set of objects, since every object that implements an interface works with the same type definitions. 
+ Describing existing JavaScript APIs and specifying function parameters and return value types. 
 
Type aliases can act like interfaces. However, there are minor differences. <br>
The key difference is that a type alias cannot be reopened to add new properties, whereas an interface can be easily extended.<br> 
In addition, only a union or tuple can be described using a type alias.

Interfaces can complement each other. <br> This allows members of one interface to be copied into another, providing more flexibility when dividing interfaces into reusable components.

**Skills learned:**

+ Understanding what an interface is in TypeScript
+ Declaring an interface and creating an instance of it.
+ Extending an interface.
+ Declaring an interface with custom array types.

**How to use them:**

In this module, I learned that in TypeScript, interfaces can be used in the same way as in traditional object-oriented programming.<br>
You can also use interfaces to define object types.
That interfaces have properties that are mandatory, optional, or read-only.<br>
That interfaces can be extended.
In the future, interfaces can help me with code reusability and easier refactoring

### 4. Develop Typed Functions in TypeScript 📌

**Key learnings:**

TypeScript adds a number of new features to standard JavaScript functions that make them easier to work with.

Adding types to functions helps prevent passing values that should not be passed to functions.

You can define the type of a function using a type alias or an interface

You can designate function parameters as mandatory or optional

The TypeScript compiler assumes by default that all parameters defined in a function are required. 
When you call a function, the TypeScript compiler checks the following:

+ Whether values have been provided for each parameter.
+ Whether only those parameters that are required by the function are passed;
+ Parameters are passed in the order in which they are defined in the function.

You can define optional parameters by adding a question mark (?) to the end of the parameter name

You can also assign default values to optional parameters.<br> 
If a value is passed to an optional parameter as an argument, it will be assigned that value. 
Otherwise, it is assigned a default value. 
 
Rest parameters are treated as an unlimited number of optional parameters. You can remove them or add them in any number.

You can use a method called deconstruct object parameters to include named parameters.

**Skills learned:**
+ Understand the advantage of using types in functions.
+ Declare functions with strictly typed parameters and return values.
+ Declare functions that have mandatory and optional parameters, default parameters, and rest parameters.
+ Define function types using type aliases or interfaces.

**How to use them:**

After passing this module, I learned how to declare and call functions with different types of parameters.<br>
In future development, this information will help me to create functions with different types of parameters, as well as to specify the data type of return values.<br>
This will simplify development when you clearly understand what type of data the function needs and what type of data it will output


### 5. Declare and Instantiate Classes in TypeScript 📌

**Key learnings:**

TypeScript classes are another way to define the form of an object in addition to describing object types using interfaces and functions. 

In TypeScript, you can control the visibility of class members by adding one of the keywords before the element name:
+ public - public element, 
+ private - the element cannot be accessed from the outside,
+ protected - acts in the same way as the private modifier, except that elements declared as protected are also available in derived classes

In addition, properties can be labeled as readonly using the readonly modifier

There is another type of property called static property. Static properties and methods are common to all instances of a class.

Classes can be extended with the help of inheritance.<br>
By extending a class, new classes can be created that use existing code from the inherited class and build upon it.

Also, methods in a class can be overridden.<br>That is, if you create a function in a subclass with the same name as a function in the base class, the new function will have different functionality.

You can use an interface to precisely define the form of an instance of a class.<br> Class declarations can have a reference in their proposal to one or more interfaces.

**Skills learned:**

+ Creating a class instance
+ Applying class access modifiers
+ Extending a class using inheritance
+ Declaring an interface to precisely define the form of a class

**How to use them:**

With this module, I learned how to create classes with different access modifiers, how to extend classes with inheritance,<br> and how to use an interface to more precisely define the form of an instance of a class.<br>
In the future, I will use this information to create classes in TypeScript

### 6. Generics in TypeScript 📌

**Key learnings:**

Generics are a way of passing types to a component so that you can apply your own types not only to variables of a universal type, but also to interfaces, functions, and classes.

Generics can:

+ Provide more flexibility when working with types.
+ Support code reuse.
+ Reduce the need to use the type any.

Generics define one or more type variables to specify the types to be passed to the component, within angle brackets (< >).

When using type variables to create universal components, only the properties and methods of objects available for each type can be used. <br>
This prevents errors from occurring when you try to perform an operation with a parameter value that is incompatible with the type passed to it.

Universal constraints can be applied to generics. Constraints allow you to rely on a more specific type when using a universal type.

**Skills learned:**

+ Implementation of generics with interfaces and classes
+ Declaring a universal interface
+ Declaring a class using a generics
+ Using universal constraints with custom types and classes

**How to use them:**

In this module, I learned how to use universal patterns in classes and interfaces. <br>
In the future, universal patterns will help me create universal functions or classes that work with different data types and
use the same data type in multiple places.

### 7. Work with External Libraries in TypeScript 📌

**Key learnings:**

Modules provide a way to organize and classify code, allowing related code to be grouped together.<br>
In addition, when code is inside a module, it is extracted from the global scope into the module scope.

You can export any declaration by adding the export keyword or import it using the import keyword. 

The import operator can take several forms depending on the purpose:

+ importing a single export from a module 
+ renamed import with the as keyword 
+ importing the entire module into a single variable

Any file that contains a top-level import or export statement is considered a module.

In TypeScript, external libraries are accessed using the import statement.<br>
After importing a library and defining its type, the library can be used in code and benefit from IntelliSense and type checking.


**Skills learned:**

+ Exporting and importing module components
+ Module compilation
+ Access to external type libraries
+ Installing and implementing a type library named _dotenv_.

**How to use them:**

This section helped me understand what modules are in TypeScript. <br> How to compile them and how to connect external type libraries.<br>
In the future, this information will help me compile modules correctly and use external libraries.

### 8. Organize Code with Namespaces in TypeScript 📌

**Key learnings:**
**Skills learned:**
**How to use them:**