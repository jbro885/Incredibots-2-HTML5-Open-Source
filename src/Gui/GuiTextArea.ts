import { Stage, Button, TextInput, FastLayoutOptions, LayoutOptions, AnchorLayoutOptions, AnchorLayout } from '@puxi/core'
import { Container, Text, TextStyle, Texture, Sprite } from 'pixi.js'
import { Resource } from '../Game/Graphics/Resource'
import { Main } from '../Main'

export class GuiTextArea extends Stage
{
	private baseSkin:Texture;
	private rollSkin:Texture;

	public text: String = ''

	constructor(xPos:number, yPos:number, w:number, h:number, format:TextStyle|null = null)
	{
		super(w, h)
		this.x = xPos
		this.y = yPos
		this.width = w
		this.height = h
		this.interactive = true

		this.baseSkin = Resource.cGuiTextAreaBase
		this.rollSkin = Resource.cGuiTextAreaRoll

		if (!format) format = new TextStyle()
		format.fontFamily = Main.GLOBAL_FONT
		format.fill = '#4C3D57'

		const backgroundContainer = new Container()
		const backgroundSprite = new Sprite(this.baseSkin)
		backgroundSprite.width = w
		backgroundSprite.height = h
		backgroundContainer.addChild(backgroundSprite)

		const textInput = new TextInput({
			multiLine: true,
			value: '',
			width: w,
			height: h,
			style: format || new TextStyle(),
			background: backgroundContainer
		})
		textInput.setPadding(5, 5)

		this.on('mouseover', () => {
			backgroundSprite.texture = this.rollSkin
		})
		this.on('mouseout', () => {
			if (textInput.isFocused) return
			backgroundSprite.texture = this.baseSkin
		})

		textInput.on('focus', () => {
			backgroundSprite.texture = this.rollSkin
		})
		textInput.on('blur', () => {
			backgroundSprite.texture = this.baseSkin
		})
		textInput.on('change', () => {
			this.text = textInput.text
		})

		textInput.setLayoutOptions(
			new FastLayoutOptions({
				width: 0.9999,
				height: 0.9999
			})
		)

		this.addChild(textInput)
	}
}