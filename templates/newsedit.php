<form action="newsupdate.php" method="post">
	<div class="row">
		<div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
			<div class="form-group">
				<label for="ident">#&nbsp;<span>###news-id###</span></label>
				<input type="hidden" name="id" value="###news-id###" class="form-control" id="ident">
			</div>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
			<div class="form-group">
				<p class="text-right">Datum: ###time###</p>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="title">Titel:</label>
				<input type="text" name="title" value="###news-title###" class="form-control" id="title">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="text">Text:</label>
				<textarea name="message" rows="10" class="form-control" id="text">###news-message###</textarea>
			</div>
		</div>
	</div>
	<div class="checkbox">
		<span>Sichtbar?</span>
		<input type="radio" name="visible" value="0" ###chk_yes###> ja 
		<input type="radio" name="visible" value="-1" ###chk_no###> nein
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<button type="submit" class="btn btn-success">Speichern</button>
				<span></span>
				<button type="reset" class="btn btn-danger">Zurücksetzen</button>
			</div>
		</div>
	</div>
</form>