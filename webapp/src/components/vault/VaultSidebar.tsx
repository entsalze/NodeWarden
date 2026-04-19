import {
  Archive,
  Copy,
  CreditCard,
  Folder as FolderIcon,
  FolderPlus,
  FolderX,
  Globe,
  KeyRound,
  LayoutGrid,
  Pencil,
  ShieldUser,
  Star,
  StickyNote,
  Trash2,
  X,
} from 'lucide-preact';
import type { Folder } from '@/lib/types';
import { t } from '@/lib/i18n';
import type { SidebarFilter } from '@/components/vault/vault-page-helpers';

interface VaultSidebarProps {
  folders: Folder[];
  sidebarFilter: SidebarFilter;
  busy: boolean;
  isMobileLayout: boolean;
  mobileSidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
  onChangeFilter: (filter: SidebarFilter) => void;
  onOpenDeleteAllFolders: () => void;
  onOpenCreateFolder: () => void;
  onOpenRenameFolder: (folder: Folder) => void;
  onOpenDeleteFolder: (folder: Folder) => void;
}

export default function VaultSidebar(props: VaultSidebarProps) {
  const treeBtnClasses = (active: boolean) => 
    `w-full border-none bg-transparent text-left rounded-lg p-2 mb-1 cursor-pointer flex items-center gap-2 transition-all duration-fast ease-smooth hover:translate-x-0.5 ${active ? 'bg-primary/10 text-primary-strong font-bold' : 'text-slate-700'}`;

  const folderDeleteBtnClasses = "border-none bg-transparent text-slate-500 w-6 h-6 p-0 cursor-pointer shrink-0 inline-flex items-center justify-center rounded transition-all duration-fast ease-smooth hover:text-red-700 hover:bg-red-100 hover:scale-110";
  const folderEditBtnClasses = "border-none bg-transparent text-slate-500 w-6 h-6 p-0 cursor-pointer shrink-0 inline-flex items-center justify-center rounded transition-all duration-fast ease-smooth hover:text-blue-700 hover:bg-blue-100";

  return (
    <aside className={`flex flex-col gap-2 overflow-auto ${props.isMobileLayout ? 'fixed inset-y-0 left-0 z-55 w-[280px] bg-panel shadow-2xl p-4 transition-transform duration-300' : 'w-[240px] p-0.5'}`}>
      {props.isMobileLayout && (
        <div className="flex items-center justify-between pb-4 border-b border-line mb-2">
          <div className="text-lg font-bold text-slate-900">{t('txt_folders')}</div>
          <button type="button" className="w-8 h-8 flex items-center justify-center border-none bg-slate-100 rounded-full text-slate-600" onClick={props.onCloseMobileSidebar} aria-label={t('txt_close')}>
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="border border-line rounded-[19px] p-3 mb-2 bg-panel">
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'all')} onClick={() => props.onChangeFilter({ kind: 'all' })}>
          <LayoutGrid size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_all_items')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'favorite')} onClick={() => props.onChangeFilter({ kind: 'favorite' })}>
          <Star size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_favorites')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'archive')} onClick={() => props.onChangeFilter({ kind: 'archive' })}>
          <Archive size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_archive')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'trash')} onClick={() => props.onChangeFilter({ kind: 'trash' })}>
          <Trash2 size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_trash')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'duplicates')} onClick={() => props.onChangeFilter({ kind: 'duplicates' })}>
          <Copy size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_duplicates')}</span>
        </button>
      </div>

      <div className="border border-line rounded-[19px] p-3 mb-2 bg-panel">
        <div className="text-[13px] font-bold text-slate-600 mb-2">{t('txt_type')}</div>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'type' && props.sidebarFilter.value === 'login')} onClick={() => props.onChangeFilter({ kind: 'type', value: 'login' })}>
          <Globe size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_login')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'type' && props.sidebarFilter.value === 'card')} onClick={() => props.onChangeFilter({ kind: 'type', value: 'card' })}>
          <CreditCard size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_card')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'type' && props.sidebarFilter.value === 'identity')} onClick={() => props.onChangeFilter({ kind: 'type', value: 'identity' })}>
          <ShieldUser size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_identity')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'type' && props.sidebarFilter.value === 'note')} onClick={() => props.onChangeFilter({ kind: 'type', value: 'note' })}>
          <StickyNote size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_note')}</span>
        </button>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'type' && props.sidebarFilter.value === 'ssh')} onClick={() => props.onChangeFilter({ kind: 'type', value: 'ssh' })}>
          <KeyRound size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_ssh_key')}</span>
        </button>
      </div>

      <div className="border border-line rounded-[19px] p-3 mb-2 bg-panel">
        <div className="flex items-center justify-between pb-2">
          <div className="text-[13px] font-bold text-slate-600">{t('txt_folders')}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={folderDeleteBtnClasses}
              title={t('txt_delete_all_folders')}
              aria-label={t('txt_delete_all_folders')}
              disabled={props.busy || props.folders.length === 0}
              onClick={props.onOpenDeleteAllFolders}
            >
              <X size={14} />
            </button>
            <button type="button" className="border-none bg-transparent text-slate-700 flex items-center justify-center cursor-pointer hover:text-blue-700" onClick={props.onOpenCreateFolder}>
              <FolderPlus size={14} />
            </button>
          </div>
        </div>
        <button type="button" className={treeBtnClasses(props.sidebarFilter.kind === 'folder' && props.sidebarFilter.folderId === null)} onClick={() => props.onChangeFilter({ kind: 'folder', folderId: null })}>
          <FolderX size={14} className="shrink-0" /> <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{t('txt_no_folder')}</span>
        </button>
        {props.folders.map((folder) => (
          <div key={folder.id} className="flex items-center gap-1.5 group">
            <button
              type="button"
              className={treeBtnClasses(props.sidebarFilter.kind === 'folder' && props.sidebarFilter.folderId === folder.id)}
              onClick={() => props.onChangeFilter({ kind: 'folder', folderId: folder.id })}
            >
              <FolderIcon size={14} className="shrink-0" />
              <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis" title={folder.decName || folder.name || folder.id}>
                {folder.decName || folder.name || folder.id}
              </span>
            </button>
            <button
              type="button"
              className={`${folderEditBtnClasses} opacity-0 group-hover:opacity-100 focus:opacity-100`}
              title={t('txt_edit')}
              aria-label={t('txt_edit')}
              disabled={props.busy}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onOpenRenameFolder(folder);
              }}
            >
              <Pencil size={12} />
            </button>
            <button
              type="button"
              className={`${folderDeleteBtnClasses} opacity-0 group-hover:opacity-100 focus:opacity-100`}
              title={t('txt_delete')}
              aria-label={t('txt_delete')}
              disabled={props.busy}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                props.onOpenDeleteFolder(folder);
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
