<div class="row">
   	<div class="col-lg-10 col-md-10 col-sm-10 col-12">
   		<div class="panel">
   			<h4><img class="glyph-icon-24" src="../templates/default/img/svg/si-glyph-pen.svg"> {edit_link}</h4>
   		</div>
   	</div>
</div>
<form action="linkupdate.php" method="post">
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="ident">#</label> <span>##placeholder-id##</span>
				<input type="hidden" name="id" value="##placeholder-id##">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="title">{title}:</label>
				<input type="text" name="title" value="##placeholder-title##" class="form-control" id="title">			
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="tagline">{tagline}:</label>
				<input type="text" name="tagline" value="##placeholder-tagline##" class="form-control" id="tagline">			
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="uri">{uri}:</label>
				<input type="text" name="uri" value="##placeholder-uri##" class="form-control" id="uid">
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="comment">{comment}:</label>
				<textarea name="comment" rows="10" class="form-control" id="comment">##placeholder-comment##</textarea>
			</div>
		</div>
	</div>
	<div class="checkbox">
		<span>{visible}?</span>
		<input type="radio" name="visible" value="0" ##placeholder-chk_yes## > {yes}
		<input type="radio" name="visible" value="-1" ##placeholder-chk_no## > {no}
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-groupt">
				<button type="submit" class="btn btn-success">{save}</button>
				<span></span>
				<button type="reset" class="btn btn-danger">{reset}</button>
			</div>
		</div>
	</div>
</form>