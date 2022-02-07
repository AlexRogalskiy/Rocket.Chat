import { Tabs, Box, TextInput, Field } from '@rocket.chat/fuselage';
import React, { memo, useMemo, useState } from 'react';

import type { ISetting } from '../../../../../definition/ISetting';
import { useEditableSettings, useEditableSettingsGroupSections } from '../../../../contexts/EditableSettingsContext';
// import { useEndpoint } from '../../../../contexts/ServerContext';
// import { useSetting } from '../../../../contexts/SettingsContext';
// import { useToastMessageDispatch } from '../../../../contexts/ToastMessagesContext';
import { useTranslation, TranslationKey } from '../../../../contexts/TranslationContext';
import GroupPage from '../GroupPage';
import Section from '../Section';
import VoipExtensionsPage from './VoipExtensionsPage';

function VoipGroupPage({ _id, ...group }: ISetting): JSX.Element {
	const t = useTranslation();
	// const dispatchToastMessage = useToastMessageDispatch();
	// const testConnection = useEndpoint('POST', 'voip.testConnection');
	// const voipEnabled = useSetting('VOIP_Enabled');

	const editableSettings = useEditableSettings(
		useMemo(
			() => ({
				group: 'VoIP',
			}),
			[],
		),
	);

	// const changed = useMemo(() => editableSettings.some(({ changed }) => changed), [editableSettings]);

	// const handleTestConnectionButtonClick = async (): Promise<void> => {
	// 	try {
	// 		const { message } = await testConnection();
	// 		dispatchToastMessage({ type: 'success', message: t(message) });
	// 	} catch (error) {
	// 		dispatchToastMessage({ type: 'error', message: error });
	// 	}
	// };

	const tabs = ['Server_Configuration', 'Extensions'];

	const [tab, setTab] = useState(tabs[0]);
	const handleTabClick = useMemo(() => (tab: string) => (): void => setTab(tab), [setTab]);
	const sections = useEditableSettingsGroupSections('VoIP', tab);

	if (!tab && tabs[0]) {
		setTab(tabs[0]);
	}

	const tabsComponent = (
		<Tabs>
			{tabs.map((tabName) => (
				<Tabs.Item key={tabName || ''} selected={tab === tabName} onClick={handleTabClick(tabName)}>
					{tabName ? t(tabName as TranslationKey) : t(_id as TranslationKey)}
				</Tabs.Item>
			))}
		</Tabs>
	);

	return (
		<GroupPage _id={_id} {...group} tabs={tabsComponent} customPage={tab === 'Extensions' && <VoipExtensionsPage />}>
			{tab === 'Server_Configuration' && (
				<>
					{sections.map((sectionName) => (
						<Section key={sectionName || ''} groupId={_id} sectionName={sectionName} tabName={tab} solo={false} />
					))}
				</>
			)}
		</GroupPage>
	);
}

export default memo(VoipGroupPage);
