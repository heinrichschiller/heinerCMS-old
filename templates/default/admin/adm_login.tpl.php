<form class="form-signin" action="login.php" method="post">
	<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
	<div class="form-group">
		<input type="email" name="email" class="form-control" id="email" placeholder="Email adress" maxlength="64" autofocus required>
	</div>
	<div class="form-group">
		<input type="password" name="password" class="form-control" id="passwd" placeholder="Password">
	</div>
	<div>
		<button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
	</div>
	<div class="form-group back-to-mainpage">
		<a href="$PHP_SELF/../../index.php?uri=mainpage"><span>Back to mainpage</span></a>
	</div>
	<div class="form-group">
		<p>© 2017-2018</p>
	</div>
</form>