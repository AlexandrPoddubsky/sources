
// -- Я модератор, кнопка, блок ---
var moderator = {

    init: function ()
    {
       $('#moder_button').click( function (){ moderator.ajax_auth();  $('#moder_block').show('fade'); });
       $('#moder_block_close').click( function (){ moderator.close_block();  });

    },

    ajax_auth: function ()
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/auth/',moderator.auth_resp);
    },

    ajax_promt: function ()
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/promt/',moderator.auth_resp);
    },

    ajax_press: function (id, secure, expire, mark)
    {
        disabled_with_timeout( $('.bun_btn_all'), 5);
        $.post('/moder/press/', { id: id, secure: secure, expire: expire, mark: mark }, moderator.auth_resp);
    },

    auth_resp: function (data)
    {
        if (data)
        {
            $('#moder_block_inner').empty();
            $('#moder_block_inner').html(data);
            moderator.new_sett();
            disabled_with_timeout( $('.bun_btn_all'), 0.1);
        }

    },

    close_block: function ()
    {
        $('#moder_block').hide('fade');

    },

    new_sett: function (data)
    {
        $('#moder_agree').click( function (){ moderator.ajax_promt(); });
        $('#moder_close').click( function (){ moderator.close_block(); });

        var id = $('#bun_mess_id').val();
        var secure = $('#bun_mess_secure').val();
        var expire = $('#bun_mess_expire').val();
        $('#bun_ys').click( function (){
          moderator.ajax_press(id, secure, expire, 1);
        });
        $('#bun_no').click( function (){
          moderator.ajax_press(id, secure, expire, -1);
        });
        $('#bun_ig').click( function (){
          moderator.ajax_press(id, secure, expire, 0);
        });
        $('#bun_next').click( function (){
          moderator.ajax_press(0, secure, expire, 0);
        });







    }




}
    
