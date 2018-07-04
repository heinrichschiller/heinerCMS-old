<div class="row">
   	<div class="col-lg-10 col-md-10 col-sm-10 col-12">
   		<div class="panel">
   			<h4><img class="glyph-icon-24" src="../templates/default/admin/img/svg/si-glyph-file-download.svg"> ##placeholder-header##</h4>
   		</div>
   	</div>
</div>
<form action="##placeholder-action##" method="post">
	<div class="row">
		<div class="col-lg-8 col-md-9 col-sm-9 col-xs-12">
			<div class="form-group">
				<label for="ident">#&nbsp;</label><span>##placeholder-id##</span>
				<input type="hidden" name="id" value="##placeholder-id##">
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
				<label for="title">{title}:</label>
				<input type="text" name="title" value="##placeholder-title##" class="form-control" id="title" required>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="path">{path}:</label>
				<input type="text" name="path" value="##placeholder-path##" class="form-control" id="path" required>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div class="form-group">
				<label for="filename">{filename}:</label>
				<input type="text" name="filename" value="##placeholder-filename##" class="form-control" id="filename" required>
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
	<div class="row">
		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<span>{visible}?</span>
        	<div class="custom-control custom-radio custom-control-inline">
          		<input type="radio" id="customRadioInline1" name="visible" value="0" class="custom-control-input" ##placeholder-chk_yes##>
          		<label class="custom-control-label" for="customRadioInline1">{yes}</label>
        	</div>
        	<div class="custom-control custom-radio custom-control-inline">
          		<input type="radio" id="customRadioInline2" name="visible" value="-1" class="custom-control-input" ##placeholder-chk_no##>
          		<label class="custom-control-label" for="customRadioInline2">{no}</label>
        	</div>
        </div>
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