<div class="container-fluid">
    <div class="row">
    	<div class="col-lg-10 col-md-10 col-sm-10 col-12">
    		<div class="panel">
    			<h4><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> {news}</h4>
    		</div>
    	</div>
    </div>
    <div class="row">
    	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    		<table class="table table-hover table-striped">
    			<thead>
    				<tr>
    					<th>#</th>
    					<th>{date}</th>
    					<th>{title}</th>
    					<th>{visible}?</th>
    					<th>{actions}</th>
    				</tr>
    			</thead>
    			<tbody>
					<@table_content@>
    			</tbody>
    		</table>
    	</div>
    </div>
    <div class="row">
    	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    		<a href="$PHP_SELF?uri=newsadd" class="btn btn-primary" role="button">{create_news}</a>
    	</div>
    </div>
</div>