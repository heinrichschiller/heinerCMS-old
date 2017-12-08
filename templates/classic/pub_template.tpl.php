<!DOCTYPE HTML PUBLIC"-//W3C//DTD HTML 4.01 TRANSITIONAL//EN">
<html>
  <head>
    <title><@title@></title>
    <style type="text/css">
        a									{ color:#336699; }
        a.red							{ color:#FF0000; }
        body							{ margin:0px;
        				  					background-color:#CCCCCC;}
        table#main				{ width:100%;
        			      				border:none; }
        td#logo						{ background-color:#9999CC;
														border-bottom:solid 1px #000000;
														font-size:35px;
														padding:5px; }
        td#shortnav				{ background-color:#CCCCFF;
														border-bottom:solid 1px #000000;
														font-size:13px;
														padding:5px; }
        td#navi						{ width:25%;
														background-color:#EEEEEE;
														border-right:dashed 1px #000000;
														border-bottom:solid 1px #000000;
														padding:5px;
														vertical-align:top; }
        td#content				{ width:75%;
														background-color:#FFFFFF;
														border-bottom:solid 1px #000000;
														padding:5px;
														vertical-align:top; }
        span.uri					{ color:#008000; }
        p#disclaimer			{ font-size:10px;
														color:#000000;
														text-align:center; }
        h4								{ color:#003366; }
        p									{ text-align:justify; }
        tr								{ text-align:left;
        										background-color:#DDDDDD; }
        td								{ background-color:#EEEEEE; }
    </style>
  </head>
  <body>
    <table id="main" cellpadding="0" cellspacing="0">
      <tr>
        <td id="logo" colspan="2"><@title@></td>
      </tr>
      <tr>
        <td id="shortnav" colspan="2"><@shortnav@></td>
      </tr>
      <tr>
        <td id="navi"><@navigation@></td>
        <td id="content"><@content@></td>
      </tr>
      <tr>
        <td id="shortnav" colspan="2"><@shortnav@></td>
      </tr>
    </table>
    <p id="disclaimer">Hier k&ouml;nnte der Text des Disclaimer stehen und rechtliche Hinweise
      oder Kontaktm&ouml;glichkeiten.<br>Max Mustermann<br>Musterstr. 12<br>55555 Musterstadt</p>
  </body>
</html>