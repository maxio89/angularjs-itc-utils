angularjs-itc-utils
===================
[![Build Status](https://travis-ci.org/maxio89/angularjs-itc-utils.png?branch=master)](https://travis-ci.org/maxio89/angularjs-itc-utils)

## To start project

<pre><code>npm install </code></pre>
<pre><code>bower install</code></pre>
<pre><code>grunt test:e2e </code></pre>
<pre><code>grunt serve </code></pre>

## Directives

### itcSubmit
Works similar as ngSubmit, but prevents submitting if form is invalid or empty.
##### Usage:
<pre> <code class="html"> &lt;form name="registerForm" itc-submit="register()"&gt;</code> </pre>

### itcDefaultMessage
Displays popovers as a descriptions to the inputs. Shows on the focus event and disappears on blur.
##### Usage:
<pre> <code class="html"> &lt;input itc-default-message="Enter your password"&gt;</code> </pre>

### itcValidationMessages
Iterates through all inputs in form and displays validations messages.
##### Usage:
<pre> <code class="html"> &lt;form name="registerForm" itc-validation-messages&gt;</code> </pre>
##### Options:
Default event is keyup, but you can change it to a focus by adding:
<b>itc-validation-messages-event="blur"</b>

Default way to show messages is popover, but you can change it to a block under the input:
<b>itc-validation-message-type="block"</b>
##### Example:
<pre> <code class="html"> &lt;form name="registerForm" itc-validation-messages itc-validation-messages-event="blur" itc-validation-message-type="block"&gt;</code> </pre>
Default messages are taking from ValidationMessages constant list, but you can change it by adding to the selected input:
<b>error_key-message="Provide longer email"</b>
Where error_key is a name of error key from $error table.
##### Example:
<pre> <code class="html"> &lt;input type="email" minlength-message="Provide longer email"&gt;</code> </pre>


	


