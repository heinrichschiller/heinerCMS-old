<div class="row">
	<div class="col-lg-10 col-md-10 col-sm-10 col-12">
		<div class="panel">
			<h4>
				<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				{user}: ##placeholder-firstname## ##placeholder-lastname##
			</h4>
		</div>
	</div>
</div>
<form action="useredit.php" method="post">
	<div class="row">
		<div class="col-lg-8 col-md-9 col-sm-9 col-xs-12">
			<div class="form-group">
				<label for="ident">#&nbsp;</label><span>##placeholder-id##</span>
				<input type="hidden" name="id" value="##placeholder-id##" class="form-control" id="ident">
			</div>
		</div>
		<div class="col-lg-4 col-md-3 col-sm-3 col-xs-12">
			<div class="form-group">
				<p class="text-right">{date}: ##placeholder-datetime##</p>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="firstname">{firstname}:</label>
				<input type="text" name="firstname" value="##placeholder-firstname##" class="form-control" id="firstname" required>
			</div>
		</div>
	</div>
		<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="lastname">{lastname}:</label>
				<input type="text" name="lastname" value="##placeholder-lastname##" class="form-control" id="lastname" required>
			</div>
		</div>
	</div>
		<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="username">{username}:</label>
				<input type="text" name="username" value="##placeholder-username##" class="form-control" id="username" required>
			</div>
		</div>
	</div>
		<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="email">{email}:</label>
				<input type="email" name="email" value="##placeholder-email##" class="form-control" id="email">
			</div>
		</div>
	</div>
		<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="public_as">{show_publicly_as}:</label>
				<input type="text" name="public_as" value="##placeholder-public-as##" class="form-control" id="public_as">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="password">{password}:</label>
				<button type="button" class="btn btn-default" id="password" onclick="systemMessage()">{generate_password}</button>
			</div>
		</div>
	</div>
	<div class="checkbox">
		<span>{active}?</span>
		<input type="radio" name="active" value="true" ##placeholder-chk_yes## > {yes} 
		<input type="radio" name="active" value="false" ##placeholder-chk_no## > {no}
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<button type="submit" class="btn btn-success">{save}</button>
				<span></span>
				<button type="reset" class="btn btn-danger">{reset}</button>
			</div>
		</div>
	</div>
</form>