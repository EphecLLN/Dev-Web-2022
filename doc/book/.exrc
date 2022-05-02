let s:cpo_save=&cpo
set cpo&vim
inoremap <silent> <Plug>NERDCommenterInsert :call nerdcommenter#Comment('i', "Insert")
inoremap <silent> <Plug>CocRefresh =coc#_complete()
inoremap <silent> <expr> <C-Space> coc#refresh()
inoremap <expr> <S-Tab> pumvisible() ? "\" : "\"
vnoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? coc#float#scroll(0) : "\"
nnoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? coc#float#scroll(0) : "\"
omap  <Plug>(SmoothieBackwards)
map  <Plug>(SmoothieDownwards)
vnoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? coc#float#scroll(1) : "\"
nnoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? coc#float#scroll(1) : "\"
omap  <Plug>(SmoothieForwards)
map  h
map <NL> j
map  k
map  l
xmap <silent>  <Plug>(coc-range-select)
nmap <silent>  <Plug>(coc-range-select)
map  <Plug>(SmoothieUpwards)
nnoremap <nowait> <silent>  p :CocListResume
nnoremap <nowait> <silent>  k :CocPrev
nnoremap <nowait> <silent>  j :CocNext
nnoremap <nowait> <silent>  s :CocList -I symbols
nnoremap <nowait> <silent>  o :CocList outline
nnoremap <nowait> <silent>  c :CocList commands
nnoremap <nowait> <silent>  e :CocList extensions
nnoremap <nowait> <silent>  a :CocList diagnostics
omap <silent> % <Plug>(MatchitOperationForward)
xmap <silent> % <Plug>(MatchitVisualForward)
nmap <silent> % <Plug>(MatchitNormalForward)
nnoremap : ;
nnoremap ; :
noremap D :bd
noremap H :bp
noremap L :bn
nnoremap Y y$
omap <silent> [% <Plug>(MatchitOperationMultiBackward)
xmap <silent> [% <Plug>(MatchitVisualMultiBackward)
nmap <silent> [% <Plug>(MatchitNormalMultiBackward)
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap \w\m <Plug>VimwikiMakeTomorrowDiaryNote
nmap \w\y <Plug>VimwikiMakeYesterdayDiaryNote
nmap \w\t <Plug>VimwikiTabMakeDiaryNote
nmap \w\w <Plug>VimwikiMakeDiaryNote
nmap \w\i <Plug>VimwikiDiaryGenerateLinks
nmap \wi <Plug>VimwikiDiaryIndex
nmap \ws <Plug>VimwikiUISelect
nmap \wt <Plug>VimwikiTabIndex
nmap \ww <Plug>VimwikiIndex
nmap \ca <Plug>NERDCommenterAltDelims
xmap \cu <Plug>NERDCommenterUncomment
nmap \cu <Plug>NERDCommenterUncomment
xmap \cb <Plug>NERDCommenterAlignBoth
nmap \cb <Plug>NERDCommenterAlignBoth
xmap \cl <Plug>NERDCommenterAlignLeft
nmap \cA <Plug>NERDCommenterAppend
xmap \cy <Plug>NERDCommenterYank
nmap \cy <Plug>NERDCommenterYank
xmap \cs <Plug>NERDCommenterSexy
nmap \cs <Plug>NERDCommenterSexy
xmap \ci <Plug>NERDCommenterInvert
nmap \ci <Plug>NERDCommenterInvert
nmap \c$ <Plug>NERDCommenterToEOL
xmap \cn <Plug>NERDCommenterNested
nmap \cn <Plug>NERDCommenterNested
xmap \cm <Plug>NERDCommenterMinimal
nmap \cm <Plug>NERDCommenterMinimal
xmap \c  <Plug>NERDCommenterToggle
nmap \c  <Plug>NERDCommenterToggle
xmap \cc <Plug>NERDCommenterComment
nmap \cc <Plug>NERDCommenterComment
noremap \v :setlocal paste!
noremap \te :tab drop 
noremap \td :tabclose
noremap \tn :tabnew
nmap \cl <Plug>NERDCommenterAlignLeft
nmap \qf <Plug>(coc-fix-current)
nmap \ab <Plug>(coc-codeaction)
nmap \a <Plug>(coc-codeaction-selected)
xmap \a <Plug>(coc-codeaction-selected)
nmap \ac <Plug>(coc-codeaction-cursor)
nmap \f <Plug>(coc-format-selected)
xmap \f <Plug>(coc-format-selected)
nmap \rn <Plug>(coc-rename)
noremap \n :NERDTreeToggle
omap <silent> ]% <Plug>(MatchitOperationMultiForward)
xmap <silent> ]% <Plug>(MatchitVisualMultiForward)
nmap <silent> ]% <Plug>(MatchitNormalMultiForward)
nmap <silent> ]g <Plug>(coc-diagnostic-next)
xmap a% <Plug>(MatchitVisualTextObject)
omap ac <Plug>(coc-classobj-a)
xmap ac <Plug>(coc-classobj-a)
omap af <Plug>(coc-funcobj-a)
xmap af <Plug>(coc-funcobj-a)
xmap gx <Plug>NetrwBrowseXVis
nmap gx <Plug>NetrwBrowseX
omap <silent> g% <Plug>(MatchitOperationBackward)
xmap <silent> g% <Plug>(MatchitVisualBackward)
nmap <silent> g% <Plug>(MatchitNormalBackward)
nmap <silent> gr <Plug>(coc-references)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gd <Plug>(coc-definition)
omap ic <Plug>(coc-classobj-i)
xmap ic <Plug>(coc-classobj-i)
omap if <Plug>(coc-funcobj-i)
xmap if <Plug>(coc-funcobj-i)
xnoremap <silent> <Plug>(coc-git-chunk-outer) :call coc#rpc#request('doKeymap', ['git-chunk-outer'])
onoremap <silent> <Plug>(coc-git-chunk-outer) :call coc#rpc#request('doKeymap', ['git-chunk-outer'])
xnoremap <silent> <Plug>(coc-git-chunk-inner) :call coc#rpc#request('doKeymap', ['git-chunk-inner'])
onoremap <silent> <Plug>(coc-git-chunk-inner) :call coc#rpc#request('doKeymap', ['git-chunk-inner'])
nnoremap <silent> <Plug>(coc-git-commit) :call coc#rpc#notify('doKeymap', ['git-commit'])
nnoremap <silent> <Plug>(coc-git-chunkinfo) :call coc#rpc#notify('doKeymap', ['git-chunkinfo'])
nnoremap <silent> <Plug>(coc-git-keepboth) :call coc#rpc#notify('doKeymap', ['git-keepboth'])
nnoremap <silent> <Plug>(coc-git-keepincoming) :call coc#rpc#notify('doKeymap', ['git-keepincoming'])
nnoremap <silent> <Plug>(coc-git-keepcurrent) :call coc#rpc#notify('doKeymap', ['git-keepcurrent'])
nnoremap <silent> <Plug>(coc-git-prevconflict) :call coc#rpc#notify('doKeymap', ['git-prevconflict'])
nnoremap <silent> <Plug>(coc-git-nextconflict) :call coc#rpc#notify('doKeymap', ['git-nextconflict'])
nnoremap <silent> <Plug>(coc-git-prevchunk) :call coc#rpc#notify('doKeymap', ['git-prevchunk'])
nnoremap <silent> <Plug>(coc-git-nextchunk) :call coc#rpc#notify('doKeymap', ['git-nextchunk'])
nnoremap <SNR>111_: :=v:count ? v:count : ''
noremap <silent> <Plug>(Smoothie_G) <Cmd>call smoothie#cursor_movement('G')  
noremap <silent> <Plug>(Smoothie_gg) <Cmd>call smoothie#cursor_movement('gg') 
noremap <silent> <Plug>(SmoothieBackwards) <Cmd>call smoothie#backwards()           
noremap <silent> <Plug>(SmoothieForwards) <Cmd>call smoothie#forwards()            
noremap <silent> <Plug>(SmoothieUpwards) <Cmd>call smoothie#upwards()             
noremap <silent> <Plug>(SmoothieDownwards) <Cmd>call smoothie#downwards()           
nnoremap <silent> <Plug>(grammarous-move-to-previous-error) :call grammarous#move_to_previous_error(getpos('.')[1 : 2], b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-move-to-next-error) :call grammarous#move_to_next_error(getpos('.')[1 : 2], b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-disable-category) :call grammarous#disable_category_at(getpos('.')[1 : 2], b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-disable-rule) :call grammarous#disable_rule_at(getpos('.')[1 : 2], b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-remove-error) :call grammarous#remove_error_at(getpos('.')[1 : 2], b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-close-info-window) :call grammarous#info_win#close()
nnoremap <silent> <Plug>(grammarous-fixall) :call grammarous#fixall(b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-fixit) :call grammarous#fixit(grammarous#get_error_at(getpos('.')[1 : 2], b:grammarous_result))
nnoremap <silent> <Plug>(grammarous-reset) :call grammarous#reset()
nnoremap <silent> <Plug>(grammarous-open-info-window) :call grammarous#create_update_info_window_of(b:grammarous_result)
nnoremap <silent> <Plug>(grammarous-move-to-info-window) :call grammarous#create_and_jump_to_info_window_of(b:grammarous_result)
nnoremap <Plug>NERDCommenterAltDelims :call nerdcommenter#SwitchToAlternativeDelimiters(1)
xnoremap <silent> <Plug>NERDCommenterUncomment :call nerdcommenter#Comment("x", "Uncomment")
nnoremap <silent> <Plug>NERDCommenterUncomment :call nerdcommenter#Comment("n", "Uncomment")
xnoremap <silent> <Plug>NERDCommenterAlignBoth :call nerdcommenter#Comment("x", "AlignBoth")
nnoremap <silent> <Plug>NERDCommenterAlignBoth :call nerdcommenter#Comment("n", "AlignBoth")
xnoremap <silent> <Plug>NERDCommenterAlignLeft :call nerdcommenter#Comment("x", "AlignLeft")
nnoremap <silent> <Plug>NERDCommenterAlignLeft :call nerdcommenter#Comment("n", "AlignLeft")
nnoremap <silent> <Plug>NERDCommenterAppend :call nerdcommenter#Comment("n", "Append")
xnoremap <silent> <Plug>NERDCommenterYank :call nerdcommenter#Comment("x", "Yank")
nnoremap <silent> <Plug>NERDCommenterYank :call nerdcommenter#Comment("n", "Yank")
xnoremap <silent> <Plug>NERDCommenterSexy :call nerdcommenter#Comment("x", "Sexy")
nnoremap <silent> <Plug>NERDCommenterSexy :call nerdcommenter#Comment("n", "Sexy")
xnoremap <silent> <Plug>NERDCommenterInvert :call nerdcommenter#Comment("x", "Invert")
nnoremap <silent> <Plug>NERDCommenterInvert :call nerdcommenter#Comment("n", "Invert")
nnoremap <silent> <Plug>NERDCommenterToEOL :call nerdcommenter#Comment("n", "ToEOL")
xnoremap <silent> <Plug>NERDCommenterNested :call nerdcommenter#Comment("x", "Nested")
nnoremap <silent> <Plug>NERDCommenterNested :call nerdcommenter#Comment("n", "Nested")
xnoremap <silent> <Plug>NERDCommenterMinimal :call nerdcommenter#Comment("x", "Minimal")
nnoremap <silent> <Plug>NERDCommenterMinimal :call nerdcommenter#Comment("n", "Minimal")
xnoremap <silent> <Plug>NERDCommenterToggle :call nerdcommenter#Comment("x", "Toggle")
nnoremap <silent> <Plug>NERDCommenterToggle :call nerdcommenter#Comment("n", "Toggle")
xnoremap <silent> <Plug>NERDCommenterComment :call nerdcommenter#Comment("x", "Comment")
nnoremap <silent> <Plug>NERDCommenterComment :call nerdcommenter#Comment("n", "Comment")
onoremap <silent> <Plug>(coc-classobj-a) :call CocAction('selectSymbolRange', v:false, '', ['Interface', 'Struct', 'Class'])
onoremap <silent> <Plug>(coc-classobj-i) :call CocAction('selectSymbolRange', v:true, '', ['Interface', 'Struct', 'Class'])
vnoremap <silent> <Plug>(coc-classobj-a) :call CocAction('selectSymbolRange', v:false, visualmode(), ['Interface', 'Struct', 'Class'])
vnoremap <silent> <Plug>(coc-classobj-i) :call CocAction('selectSymbolRange', v:true, visualmode(), ['Interface', 'Struct', 'Class'])
onoremap <silent> <Plug>(coc-funcobj-a) :call CocAction('selectSymbolRange', v:false, '', ['Method', 'Function'])
onoremap <silent> <Plug>(coc-funcobj-i) :call CocAction('selectSymbolRange', v:true, '', ['Method', 'Function'])
vnoremap <silent> <Plug>(coc-funcobj-a) :call CocAction('selectSymbolRange', v:false, visualmode(), ['Method', 'Function'])
vnoremap <silent> <Plug>(coc-funcobj-i) :call CocAction('selectSymbolRange', v:true, visualmode(), ['Method', 'Function'])
nnoremap <silent> <Plug>(coc-cursors-position) :call CocAction('cursorsSelect', bufnr('%'), 'position', 'n')
nnoremap <silent> <Plug>(coc-cursors-word) :call CocAction('cursorsSelect', bufnr('%'), 'word', 'n')
vnoremap <silent> <Plug>(coc-cursors-range) :call CocAction('cursorsSelect', bufnr('%'), 'range', visualmode())
nnoremap <silent> <Plug>(coc-refactor) :call       CocActionAsync('refactor')
nnoremap <silent> <Plug>(coc-command-repeat) :call       CocAction('repeatCommand')
nnoremap <silent> <Plug>(coc-float-jump) :call       coc#float#jump()
nnoremap <silent> <Plug>(coc-float-hide) :call       coc#float#close_all()
nnoremap <silent> <Plug>(coc-fix-current) :call       CocActionAsync('doQuickfix')
nnoremap <silent> <Plug>(coc-openlink) :call       CocActionAsync('openLink')
nnoremap <silent> <Plug>(coc-references-used) :call       CocActionAsync('jumpUsed')
nnoremap <silent> <Plug>(coc-references) :call       CocActionAsync('jumpReferences')
nnoremap <silent> <Plug>(coc-type-definition) :call       CocActionAsync('jumpTypeDefinition')
nnoremap <silent> <Plug>(coc-implementation) :call       CocActionAsync('jumpImplementation')
nnoremap <silent> <Plug>(coc-declaration) :call       CocActionAsync('jumpDeclaration')
nnoremap <silent> <Plug>(coc-definition) :call       CocActionAsync('jumpDefinition')
nnoremap <silent> <Plug>(coc-diagnostic-prev-error) :call       CocActionAsync('diagnosticPrevious', 'error')
nnoremap <silent> <Plug>(coc-diagnostic-next-error) :call       CocActionAsync('diagnosticNext',     'error')
nnoremap <silent> <Plug>(coc-diagnostic-prev) :call       CocActionAsync('diagnosticPrevious')
nnoremap <silent> <Plug>(coc-diagnostic-next) :call       CocActionAsync('diagnosticNext')
nnoremap <silent> <Plug>(coc-diagnostic-info) :call       CocActionAsync('diagnosticInfo')
nnoremap <silent> <Plug>(coc-format) :call       CocActionAsync('format')
nnoremap <silent> <Plug>(coc-rename) :call       CocActionAsync('rename')
nnoremap <Plug>(coc-codeaction-cursor) :call       CocActionAsync('codeAction',         'cursor')
nnoremap <Plug>(coc-codeaction-line) :call       CocActionAsync('codeAction',         'line')
nnoremap <Plug>(coc-codeaction) :call       CocActionAsync('codeAction',         '')
vnoremap <silent> <Plug>(coc-codeaction-selected) :call       CocActionAsync('codeAction',         visualmode())
vnoremap <silent> <Plug>(coc-format-selected) :call       CocActionAsync('formatSelected',     visualmode())
nnoremap <Plug>(coc-codelens-action) :call       CocActionAsync('codeLensAction')
nnoremap <Plug>(coc-range-select) :call       CocActionAsync('rangeSelect',     '', v:true)
vnoremap <silent> <Plug>(coc-range-select-backward) :call       CocActionAsync('rangeSelect',     visualmode(), v:false)
vnoremap <silent> <Plug>(coc-range-select) :call       CocActionAsync('rangeSelect',     visualmode(), v:true)
xnoremap <silent> <Plug>NetrwBrowseXVis :call netrw#BrowseXVis()
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#BrowseX(netrw#GX(),netrw#CheckIfRemote(netrw#GX()))
xmap <silent> <Plug>(MatchitVisualTextObject) <Plug>(MatchitVisualMultiBackward)o<Plug>(MatchitVisualMultiForward)
onoremap <silent> <Plug>(MatchitOperationMultiForward) :call matchit#MultiMatch("W",  "o")
onoremap <silent> <Plug>(MatchitOperationMultiBackward) :call matchit#MultiMatch("bW", "o")
xnoremap <silent> <Plug>(MatchitVisualMultiForward) :call matchit#MultiMatch("W",  "n")m'gv``
xnoremap <silent> <Plug>(MatchitVisualMultiBackward) :call matchit#MultiMatch("bW", "n")m'gv``
nnoremap <silent> <Plug>(MatchitNormalMultiForward) :call matchit#MultiMatch("W",  "n")
nnoremap <silent> <Plug>(MatchitNormalMultiBackward) :call matchit#MultiMatch("bW", "n")
onoremap <silent> <Plug>(MatchitOperationBackward) :call matchit#Match_wrapper('',0,'o')
onoremap <silent> <Plug>(MatchitOperationForward) :call matchit#Match_wrapper('',1,'o')
xnoremap <silent> <Plug>(MatchitVisualBackward) :call matchit#Match_wrapper('',0,'v')m'gv``
xnoremap <silent> <Plug>(MatchitVisualForward) :call matchit#Match_wrapper('',1,'v'):if col("''") != col("$") | exe ":normal! m'" | endifgv``
nnoremap <silent> <Plug>(MatchitNormalBackward) :call matchit#Match_wrapper('',0,'n')
nnoremap <silent> <Plug>(MatchitNormalForward) :call matchit#Match_wrapper('',1,'n')
nnoremap <silent> <BS> :noh
map <PageUp> <Plug>(SmoothieBackwards)
map <PageDown> <Plug>(SmoothieForwards)
map <S-Up> <Plug>(SmoothieUpwards)
map <S-Down> <Plug>(SmoothieDownwards)
inoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? "\=coc#float#scroll(0)\" : "\<Left>"
inoremap <nowait> <silent> <expr>  coc#float#has_scroll() ? "\=coc#float#scroll(1)\" : "\<Right>"
inoremap <silent> <expr>  pumvisible() ? coc#_select_confirm(): "\u\\=coc#on_enter()\"
inoremap  u
inoremap  u
let &cpo=s:cpo_save
unlet s:cpo_save
set backspace=indent,start,eol
set cmdheight=2
set expandtab
set helplang=en
set ignorecase
set listchars=tab:â”œâ”€â”¤,trail:Â·,extends:â–¶,precedes:â—€,conceal:â–ª
set makeprg=
set nomodeline
set mouse=a
set packpath=/nix/store/fn5ikhn891qfmjga8nz95qnzbs3w7y2k-vim-pack-dir,~/.config/nvim,/etc/xdg/nvim,~/.local/share/flatpak/exports/etc/xdg/nvim,/var/lib/flatpak/exports/etc/xdg/nvim,~/.nix-profile/etc/xdg/nvim,/etc/profiles/per-user/austy/etc/xdg/nvim,/nix/var/nix/profiles/default/etc/xdg/nvim,/run/current-system/sw/etc/xdg/nvim,~/.local/share/nvim/site,/nix/store/d9n0iflz6qz5n9sndgz58xn1dfzsj2fc-devshell-dir/share/nvim/site,/nix/store/x7f72fx67nczxc9wzb8dr0nfmal97qbl-desktops/share/nvim/site,~/.local/share/flatpak/exports/share/nvim/site,/var/lib/flatpak/exports/share/nvim/site,~/.nix-profile/share/nvim/site,/etc/profiles/per-user/austy/share/nvim/site,/nix/var/nix/profiles/default/share/nvim/site,/run/current-system/sw/share/nvim/site,/nix/store/8s7xlazpgfip0bfakcjvsa20zz11m0ga-neovim-unwrapped-0.7.0/share/nvim/runtime,/nix/store/8s7xlazpgfip0bfakcjvsa20zz11m0ga-neovim-unwrapped-0.7.0/lib/nvim,/run/current-system/sw/share/nvim/site/after,/nix/var/nix/profiles/default/share/nvim/site/after,/etc/profiles/per-user/austy/share/nvim/site/after,~/.nix-profile/share/nvim/site/after,/var/lib/flatpak/exports/share/nvim/site/after,~/.local/share/flatpak/exports/share/nvim/site/after,/nix/store/x7f72fx67nczxc9wzb8dr0nfmal97qbl-desktops/share/nvim/site/after,/nix/store/d9n0iflz6qz5n9sndgz58xn1dfzsj2fc-devshell-dir/share/nvim/site/after,~/.local/share/nvim/site/after,/run/current-system/sw/etc/xdg/nvim/after,/nix/var/nix/profiles/default/etc/xdg/nvim/after,/etc/profiles/per-user/austy/etc/xdg/nvim/after,~/.nix-profile/etc/xdg/nvim/after,/var/lib/flatpak/exports/etc/xdg/nvim/after,~/.local/share/flatpak/exports/etc/xdg/nvim/after,/etc/xdg/nvim/after,~/.config/nvim/after
set runtimepath=/nix/store/fn5ikhn891qfmjga8nz95qnzbs3w7y2k-vim-pack-dir,/nix/store/fn5ikhn891qfmjga8nz95qnzbs3w7y2k-vim-pack-dir/pack/*/start/*,~/.config/nvim,/etc/xdg/nvim,~/.local/share/flatpak/exports/etc/xdg/nvim,/var/lib/flatpak/exports/etc/xdg/nvim,~/.nix-profile/etc/xdg/nvim,/etc/profiles/per-user/austy/etc/xdg/nvim,/nix/var/nix/profiles/default/etc/xdg/nvim,/run/current-system/sw/etc/xdg/nvim,~/.local/share/nvim/site,/nix/store/d9n0iflz6qz5n9sndgz58xn1dfzsj2fc-devshell-dir/share/nvim/site,/nix/store/x7f72fx67nczxc9wzb8dr0nfmal97qbl-desktops/share/nvim/site,~/.local/share/flatpak/exports/share/nvim/site,/var/lib/flatpak/exports/share/nvim/site,~/.nix-profile/share/nvim/site,/etc/profiles/per-user/austy/share/nvim/site,/nix/var/nix/profiles/default/share/nvim/site,/run/current-system/sw/share/nvim/site,/nix/store/8s7xlazpgfip0bfakcjvsa20zz11m0ga-neovim-unwrapped-0.7.0/share/nvim/runtime,/nix/store/8s7xlazpgfip0bfakcjvsa20zz11m0ga-neovim-unwrapped-0.7.0/share/nvim/runtime/pack/dist/opt/matchit,/nix/store/8s7xlazpgfip0bfakcjvsa20zz11m0ga-neovim-unwrapped-0.7.0/lib/nvim,/nix/store/fn5ikhn891qfmjga8nz95qnzbs3w7y2k-vim-pack-dir/pack/*/start/*/after,/run/current-system/sw/share/nvim/site/after,/nix/var/nix/profiles/default/share/nvim/site/after,/etc/profiles/per-user/austy/share/nvim/site/after,~/.nix-profile/share/nvim/site/after,/var/lib/flatpak/exports/share/nvim/site/after,~/.local/share/flatpak/exports/share/nvim/site/after,/nix/store/x7f72fx67nczxc9wzb8dr0nfmal97qbl-desktops/share/nvim/site/after,/nix/store/d9n0iflz6qz5n9sndgz58xn1dfzsj2fc-devshell-dir/share/nvim/site/after,~/.local/share/nvim/site/after,/run/current-system/sw/etc/xdg/nvim/after,/nix/var/nix/profiles/default/etc/xdg/nvim/after,/etc/profiles/per-user/austy/etc/xdg/nvim/after,~/.nix-profile/etc/xdg/nvim/after,/var/lib/flatpak/exports/etc/xdg/nvim/after,~/.local/share/flatpak/exports/etc/xdg/nvim/after,/etc/xdg/nvim/after,~/.config/nvim/after
set scrolloff=5
set shiftround
set shiftwidth=2
set shortmess=filnxtToOFc
set showbreak=Â»Â»
set showtabline=2
set smartcase
set smartindent
set softtabstop=-1
set statusline=%{coc#status()}%{get(b:,'coc_current_function','')}
set tabline=%!airline#extensions#tabline#get()
set tabpagemax=500
set updatetime=300
set window=58
set nowritebackup
" vim: set ft=vim :
