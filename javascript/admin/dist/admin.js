$( document ).ready(function() 
{                 
    idea_list.init(); 
    comm_list.init();  
    revs_list.init();  
     
    quick_word.init();
    extra_button.init();
    
});


// -- Список комментариев ---
var comm_list = {
     
    init: function () 
    {         
        $('.comm_up').on('click',comm_list.ajax.up); 
        $('.comm_down').on('click',comm_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/develop/modcomm/', { id: id, mod: 1 } );
            comm_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/develop/modcomm/', { id: id, mod: -1 } ); 
            comm_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#comm_rank_'+id).text() * 1 + mod;
            var vote = $('#comm_vote_'+id).text() * 1 + 1;
            $('#comm_rank_'+id).text(rank); 
            $('#comm_vote_'+id).text(vote);       
        }  
        
    } 
} 



var comment_profile = {    
         
    init: function () 
    {                               
        comment_profile.ajax.load();  
    } ,  
    
    ajax: {   
    
        load: function () 
        {            
            $("#comment_hint_block").load(
                "/static/htm/admin/userinfo_comment_line.html #comment_hint_cont",
                comment_profile.ajax.on_load
            );  
        } ,
        
        on_load: function () 
        {                                  
            var elem = $('#comment_hint_cont');
            elem.detach();
            elem.appendTo($('#comment_hint_block'));
            $('#comment_input_send').on('click',comment_profile.ajax.post);
            $('#comment_hint_button').on('click',comment_profile.option.toggle);
            $('#comment_hint_cont div').on('click',comment_profile.action.print);                            
        } ,  
    
        post: function () 
        {            
            var text = $('#comment_input_text').val();   
            var user = $('#comment_input_user').val();
            
            $.post("/userinfo/setcomm/", { text: text, id: user } );
            comment_profile.option.saved();  
        }     
          
    } ,
     
    option:  {   
     
        toggle: function () 
        {                           
            $('#comment_hint_cont').toggle(); 
        } , 
     
        saved: function () 
        {                             
            $('#comment_hint_saved').show('fade');
            $('#comment_hint_saved').delay(2000).hide('fade');
        }  
    } ,
     
    action:  {  
          
        print: function () 
        {   
            $('#comment_input_text').val($(this).text()); 
            $('#comment_hint_button').click();
        }
      
    }

}   



var extra_button = {    
         
    init: function () 
    {     
       $('.extra_button.blue').on('click',extra_button.action.click);  
    } ,
    
    ajax: {    
        post: function (id) {            
            $.post( '/userinfo/setbun/', { id: id } );
            extra_button.option.saved(id); 
            extra_button.option.added(id);  
        }  
    } ,
 
    action: { 
        click: function () {          
            extra_button.ajax.post($(this).data('num'));
            $(this).off('click'); 
            return false;      
        }  
        
    }, 
    option:  {   
        saved: function (id) {                             
            $('#extra_saved'+id).show('fade');
            $('#extra_saved'+id).delay(2000).hide('fade');
        },   
        added: function (id) {                             
            var bun = $('#extra_bun'+id).text()*1;              
            $('#extra_bun'+id).text(bun+20);              
            $('#extra_add'+id).text('+'); 
        },  
    }  

}  



// -- Список контактов ---
var idea_list = {
     
    init: function () 
    {         
        $('.rating_up').on('click',idea_list.ajax.up); 
        $('.rating_down').on('click',idea_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/develop/modidea/', { id: id, mod: 1 } );
            idea_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/develop/modidea/', { id: id, mod: -1 } ); 
            idea_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#idea_rank_'+id).text() * 1 + mod;
            var vote = $('#idea_vote_'+id).text() * 1 + 1;
            $('#idea_rank_'+id).text(rank); 
            $('#idea_vote_'+id).text(vote);       
        }  
        
    } ,
 
    options: {  
         
        updater: {  
            
            show: function () 
            {          
                $('#contact_update').show('fade');       
            } , 
            
            hide: function () 
            {          
                $('#contact_update').hide('fade');       
            }   
        } 
     
    } 
}     




var profile_old = new Vue({
    el: '#profile-caption__old',
    data: {
        alert:   0,
        warning: 0,
        normal:  0,
    },
    mounted: function () {
        var day = 86400; console.log(this.old);
        if (this.old < day / 2) {
            this.alert = 1;
        } else
        if (this.old < day * 3) {
            this.warning = 1;
        } else
        if (this.old < day * 30) {
            this.normal = 1;
        }
    },
    methods: {
        show: function () {
            console.log(this.num);
        },
    },
    computed: {
        old: function () {
            return this.$el.attributes['data-old'].value;
        },
    }
});


var profile_last = new Vue({
    el: '#profile-info__old',
    data: {
        alert:   0,
        warning: 0,
        normal:  0,
    },
    mounted: function () {
        var day = 86400; console.log(this.old);
        if (this.old < 777) {
            this.alert = 1;
        } else
        if (this.old < day) {
            this.warning = 1;
        } else
        if (this.old < day * 3) {
            this.normal = 1;
        }
    },
    methods: {
        show: function () {
            console.log(this.num);
        },
    },
    computed: {
        old: function () {
            return this.$el.attributes['data-old'].value;
        },
    }
});

Vue.http.options.emulateJSON = true;

var profile_status = new Vue({
    el: '#profile-status',
    data: {
        isSuggestShow: 0,
        suggest: [
            {text: 'Предложение оплаты услуг, вирт за деньги, проституция, мошенничество, шантаж, спам', style: 'bg_ored'},
            {text: 'Фото из интернета, парень под видои девушки, вымышленные данные, обман, фейк', style: 'bg_ored'},
            {text: 'Оскорбления, хамство, троллинг, грубые сообщения, жалобы на интим фото, провокации', style: 'bg_oyel'},
            {text: 'Пишет всем подряд, игнорирует анкетные данные, гей пишет натуралам, рассылки', style: 'bg_oyel'},
            {text: 'Ложно, отклоненные жалобы, причина не ясна, ссора, выяснение отношений', style: 'bg_ogrn'},
        ],
        text:  '',
        style: '',
        user:  '',
    },
    created: function () {
        this.user  = $('#profile-status__text').data('user');
        this.text  = $('#profile-status__text').text().trim();
    },
    mounted: function () {
        this.set_style();
    },
    methods: {
        variant: function (event) {
            this.isSuggestShow  = true;
        },
        post: function () {
            if (this.user) {
                this.$http.post('/userinfo/setcomm/', {
                    id: this.user,
                    text: this.text
                });
            }
        },
        save: function (i) {
            this.text = this.suggest[i].text;
            this.style = this.suggest[i].style;
            this.isSuggestShow = false;
            this.post();
        },
        set_style: function () {
            if (this.text == this.suggest[0].text) {
                this.style = this.suggest[0].style;
            };
            if (this.text == this.suggest[1].text) {
                this.style = this.suggest[0].style;
            };
            if (this.text == this.suggest[2].text) {
                this.style = this.suggest[2].style;
            };
            if (this.text == this.suggest[3].text) {
                this.style = this.suggest[2].style;
            };
            if (this.text == this.suggest[4].text) {
                this.style = this.suggest[4].style;
            };
        }
    }
});


var quick_word = {    
         
    init: function () 
    {     
       $('.quick_link').click( function () 
       {
           quick_word.show($(this).data('title'));
       
       });    

    } , 
     
    show: function (title) 
    {  
        $('#reply_text').load('/static/htm/admin/quick/'+title+'.html');
     
    } 

}    



// -- Список отзывов ---
var revs_list = {
     
    init: function () 
    {         
        $('.revs_up').on('click',revs_list.ajax.up); 
        $('.revs_down').on('click',revs_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: 1 } );
            revs_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: -1 } ); 
            revs_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#revs_rank_'+id).text() * 1 + mod;
            var vote = $('#revs_vote_'+id).text() * 1 + 1;
            $('#revs_rank_'+id).text(rank); 
            $('#revs_vote_'+id).text(vote);       
        }  
        
    } 
}   

