import type { RefObject } from 'preact';
import { Archive, ArrowUpDown, Check, CheckCheck, FolderInput, Plus, RefreshCw, RotateCcw, Trash2, X } from 'lucide-preact';
import type { Cipher } from '@/lib/types';
import { t } from '@/lib/i18n';
import {
  CREATE_TYPE_OPTIONS,
  CreateTypeIcon,
  VAULT_SORT_OPTIONS,
  VaultListIcon,
  type SidebarFilter,
  type VaultSortMode,
} from '@/components/vault/vault-page-helpers';
import { Button } from '@/components/ui/Button';

interface VirtualRange {
  start: number;
  end: number;
  padTop: number;
  padBottom: number;
}

interface VaultListPanelProps {
  busy: boolean;
  loading: boolean;
  searchInput: string;
  sortMode: VaultSortMode;
  sortMenuOpen: boolean;
  selectedCount: number;
  totalCipherCount: number;
  filteredCiphers: Cipher[];
  visibleCiphers: Cipher[];
  virtualRange: VirtualRange;
  selectedCipherId: string;
  selectedMap: Record<string, boolean>;
  sidebarFilter: SidebarFilter;
  createMenuOpen: boolean;
  createMenuRef: RefObject<HTMLDivElement>;
  sortMenuRef: RefObject<HTMLDivElement>;
  listPanelRef: RefObject<HTMLDivElement>;
  onSearchInput: (value: string) => void;
  onClearSearch: () => void;
  onSearchCompositionStart: () => void;
  onSearchCompositionEnd: (value: string) => void;
  onToggleSortMenu: () => void;
  onSelectSortMode: (value: VaultSortMode) => void;
  onSyncVault: () => void;
  onOpenBulkDelete: () => void;
  onSelectDuplicates: () => void;
  onSelectAll: () => void;
  onToggleCreateMenu: () => void;
  onStartCreate: (type: number) => void;
  onBulkRestore: () => void;
  onBulkArchive: () => void;
  onBulkUnarchive: () => void;
  onOpenMove: () => void;
  onClearSelection: () => void;
  onScroll: (top: number) => void;
  onToggleSelected: (cipherId: string, checked: boolean) => void;
  onSelectCipher: (cipherId: string) => void;
  listSubtitle: (cipher: Cipher) => string;
}

export default function VaultListPanel(props: VaultListPanelProps) {
  return (
    <section className="flex flex-col min-w-0 min-h-0 max-w-[540px]">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="relative flex-1 min-w-0">
          <input
            className="w-full h-10.5 border border-slate-400/42 rounded-xl px-3.5 text-base outline-hidden text-text bg-panel shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-fast ease-smooth focus:border-primary/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(37,99,235,0.11),0_10px_20px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] focus:-translate-y-px pr-10.5"
            placeholder={t('txt_search_your_secure_vault')}
            value={props.searchInput}
            onInput={(e) => props.onSearchInput((e.currentTarget as HTMLInputElement).value)}
            onCompositionStart={props.onSearchCompositionStart}
            onCompositionEnd={(e) => props.onSearchCompositionEnd((e.currentTarget as HTMLInputElement).value)}
            onKeyDown={(e) => {
              if (e.key !== 'Escape' || !props.searchInput) return;
              e.preventDefault();
              props.onClearSearch();
            }}
          />
          {!!props.searchInput && (
            <button
              type="button"
              className="absolute top-1/2 right-2 w-5.5 h-5.5 flex items-center justify-center border-none rounded-full bg-slate-400/18 text-muted cursor-pointer -translate-y-1/2 transition-all duration-fast ease-out-soft hover:bg-blue-500/18 hover:text-primary hover:scale-105"
              aria-label={t('txt_clear_search')}
              title={t('txt_clear_search_esc')}
              onClick={props.onClearSearch}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative flex-none" ref={props.sortMenuRef}>
          <Button
            variant="secondary"
            size="small"
            className={`w-9 min-w-9 p-0 justify-center gap-0 ${props.sortMenuOpen ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
            aria-label={t('txt_sort')}
            title={t('txt_sort')}
            onClick={props.onToggleSortMenu}
            icon={ArrowUpDown}
          />
          {props.sortMenuOpen && (
            <div className="absolute top-[calc(100%+6px)] right-0 z-30 min-w-40 p-1.5 border border-line rounded-2xl bg-panel shadow-md origin-top-right animate-menu-in">
              {VAULT_SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full border-none bg-transparent rounded-xl p-[9px_10px] flex items-center justify-between gap-2.5 text-slate-900 text-[13px] text-left cursor-pointer transition-all duration-fast ease-smooth hover:bg-blue-50 hover:translate-x-0.5 ${props.sortMode === option.value ? 'bg-primary/10 text-primary-strong font-bold' : ''}`}
                  onClick={() => props.onSelectSortMode(option.value)}
                >
                  <span>{option.label}</span>
                  {props.sortMode === option.value ? <Check size={14} /> : <span className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-none text-muted text-[12px] whitespace-nowrap" title={t('txt_total_items_count', { count: props.totalCipherCount })}>
          {t('txt_total_items_count', { count: props.totalCipherCount })}
        </div>
        <Button variant="secondary" size="small" className="whitespace-nowrap" disabled={props.busy || props.loading} onClick={props.onSyncVault} icon={RefreshCw}>
          {t('txt_sync_vault')}
        </Button>
      </div>
      <div className="mb-2 flex items-center justify-end gap-[var(--actions-gap)]">
        {props.sidebarFilter.kind === 'duplicates' && (
          <Button variant="secondary" size="small" disabled={!props.filteredCiphers.length || props.busy} onClick={props.onSelectDuplicates} icon={Check}>
            {t('txt_select_duplicate_items')}
          </Button>
        )}
        {props.selectedCount > 0 && props.sidebarFilter.kind === 'trash' && (
          <Button variant="secondary" size="small" disabled={props.busy} onClick={props.onBulkRestore} icon={RefreshCw}>
            {t('txt_restore')}
          </Button>
        )}
        {props.selectedCount > 0 && props.sidebarFilter.kind === 'archive' && (
          <Button variant="secondary" size="small" disabled={props.busy} onClick={props.onBulkUnarchive} icon={RotateCcw}>
            {t('txt_unarchive')}
          </Button>
        )}
        {props.selectedCount > 0 && props.sidebarFilter.kind !== 'trash' && props.sidebarFilter.kind !== 'archive' && props.sidebarFilter.kind !== 'duplicates' && (
          <Button variant="secondary" size="small" disabled={props.busy} onClick={props.onBulkArchive} icon={Archive}>
            {t('txt_archive_selected')}
          </Button>
        )}
        {props.selectedCount > 0 && props.sidebarFilter.kind !== 'trash' && props.sidebarFilter.kind !== 'archive' && props.sidebarFilter.kind !== 'duplicates' && (
          <Button variant="secondary" size="small" disabled={props.busy} onClick={props.onOpenMove} icon={FolderInput}>
            {t('txt_move')}
          </Button>
        )}
        {props.selectedCount > 0 && (
          <Button variant="secondary" size="small" onClick={props.onClearSelection} icon={X}>
            {t('txt_cancel')}
          </Button>
        )}
        <Button variant="danger" size="small" disabled={!props.selectedCount || props.busy} onClick={props.onOpenBulkDelete} icon={Trash2}>
          {props.sidebarFilter.kind === 'trash' ? t('txt_delete_permanently') : t('txt_delete_selected')}
        </Button>
        <Button variant="secondary" size="small" disabled={!props.filteredCiphers.length} onClick={props.onSelectAll} icon={CheckCheck}>
          {t('txt_select_all')}
        </Button>
        <div className="relative flex-none" ref={props.createMenuRef}>
          <Button
            variant="primary"
            size="small"
            aria-label={t('txt_add')}
            title={t('txt_add')}
            onClick={props.onToggleCreateMenu}
            icon={Plus}
          />
          {props.createMenuOpen && (
            <div className="absolute top-[calc(100%+6px)] right-0 z-30 min-w-40 p-1.5 border border-line rounded-2xl bg-panel shadow-md origin-top-right animate-menu-in">
              {CREATE_TYPE_OPTIONS.map((option) => (
                <button 
                  key={option.type} 
                  type="button" 
                  className="w-full border-none bg-transparent rounded-xl p-[9px_10px] flex items-center gap-2.5 text-slate-900 text-[13px] text-left cursor-pointer transition-all duration-fast ease-smooth hover:bg-blue-50 hover:translate-x-0.5" 
                  onClick={() => props.onStartCreate(option.type)}
                >
                  <CreateTypeIcon type={option.type} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-panel border border-line rounded-2xl shadow-sm overflow-auto min-h-0 p-2" ref={props.listPanelRef} onScroll={(event) => props.onScroll((event.currentTarget as HTMLDivElement).scrollTop)}>
        {!!props.filteredCiphers.length && (
          <div style={{ paddingTop: `${props.virtualRange.padTop}px`, paddingBottom: `${props.virtualRange.padBottom}px` }}>
            {props.visibleCiphers.map((cipher, index) => (
              <div
                key={cipher.id}
                className={`w-full bg-white/88 border border-line rounded-xl p-[10px_12px] flex items-center gap-2.5 mb-2 min-h-[66px] relative cursor-pointer overflow-hidden origin-center transition-all duration-fast ease-smooth hover:bg-[#fcfdff] hover:border-slate-400/26 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:scale-[1.008] group ${props.selectedCipherId === cipher.id ? 'active bg-primary/10 border-blue-500/26 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_14px_24px_rgba(43,102,217,0.08)] -translate-y-px scale-[1.004]' : ''} animate-stagger-rise opacity-0`}
                style={{ animationDelay: `${Math.min(index, 10) * 26}ms` }}
                onClick={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest('.row-check')) return;
                  props.onSelectCipher(cipher.id);
                }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 relative z-2 cursor-pointer row-check"
                  checked={!!props.selectedMap[cipher.id]}
                  onClick={(event) => event.stopPropagation()}
                  onInput={(e) => props.onToggleSelected(cipher.id, (e.currentTarget as HTMLInputElement).checked)}
                />
                <button type="button" className="flex-1 min-w-0 border-none bg-transparent p-0 flex items-center gap-2.5 text-left cursor-pointer relative z-1 transition-transform duration-220 ease-out-soft group-hover:translate-x-0.5" onClick={() => props.onSelectCipher(cipher.id)}>
                  <div className="w-6 h-6 grid place-items-center shrink-0 transition-all duration-240 ease-out-soft group-hover:translate-x-px group-hover:scale-105">
                    <VaultListIcon cipher={cipher} />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden transition-transform duration-220 ease-out-soft group-hover:translate-x-px">
                    <span className="flex items-center gap-1.5 text-primary-strong text-[15px] font-bold min-w-0 transition-all duration-fast ease-smooth group-hover:tracking-tight" title={cipher.decName || t('txt_no_name')}>
                      <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">{cipher.decName || t('txt_no_name')}</span>
                    </span>
                    <span className="block text-slate-500 mt-0.5 text-[13px] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-fast ease-smooth group-hover:translate-x-px group-hover:opacity-90" title={props.listSubtitle(cipher)}>{props.listSubtitle(cipher)}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
        {!props.filteredCiphers.length && <div className="text-center text-muted p-10">{t('txt_no_items')}</div>}
      </div>
    </section>
  );
}
