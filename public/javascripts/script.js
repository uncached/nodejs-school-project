//   function getVal() {
//       var x = document.getElementById("address"),
//       y = document.getElementById("port");
//       if (x&&y) document.getElementById("result").innerHTML = x.value + ':' + y.value + ' Port is ?';
//   }

//   function refreshWhois()
//     {
//       $("#refreshLink").hide();
//       $("#refreshStatus").html('<img src="/images/refresh.gif">');
      
//       $.ajax({
//         type: "GET",
//         dataType: "json",
//         url: "/whois/refresh.php?domain=canhme.com",
//         cache: false,
//         error: function(xhr)
//         {
//           $("#refreshLink").show();
//           $("#refreshStatus").html('<br><span style="color: red">Error encountered. Please try again later.</span>');
//         },
//         success: function(data)
//         {
//           onRefreshWhoisSuccess({responseJSON: data});
//         }
//       });
//     }